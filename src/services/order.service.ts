import { UserModel, IUserDocument } from "../models/user.model";
import { cardModel, ICardDocument } from "../models/cards.model";
import stripeService from "../services/stripe.service";
import cartService from "../services/cart.service";
import { AddCardParams } from "../interface/stripe.interface";
import { IOrderDocument, orderModel } from "../models/order.model";
import {
  CreateCustomerResult,
  UpdateOrderParams,
  OrderModel,
} from "../interface/order.interface";

const orderService = {
  createOrder: async (
    addCardParams: AddCardParams,
    userId: string,
    amount: number,
  ): Promise<CreateCustomerResult> => {
    try {
      const user: IUserDocument | null = await UserModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      let model: CreateCustomerResult = {
        stripeCustomerId: user.stripeCustomerId || "",
      };
      if (!model.stripeCustomerId) {
        const result = await stripeService.createCustomer({
          name: user.fullName,
          email: user.email,
        });
        user.stripeCustomerId = result.id;
        await user.save();
        model.stripeCustomerId = result.id;
      }

      const card: ICardDocument | null = await cardModel.findOne({
        customerId: model.stripeCustomerId,
        cardNumber: addCardParams.card_Number,
        cardExpMonth: addCardParams.card_ExpMonth,
        cardExpYear: addCardParams.card_ExpYear,
      });

      if (!card) {
        const result = await stripeService.addCard(
          addCardParams,
          model.stripeCustomerId,
        );
        const card_model: ICardDocument | null = new cardModel({
          cartId: result,
          cardName: addCardParams.card_Name,
          cardNumber: addCardParams.card_Number,
          cardExpMonth: addCardParams.card_ExpMonth,
          cardExpYear: addCardParams.card_ExpYear,
          cardCVC: addCardParams.card_CVC,
          customerId: model.stripeCustomerId,
        });

        await card_model.save();
        model.cardId = result;
      } else {
        model.cardId = card.cartId;
      }
      const paymentIntentResult = await stripeService.generatePaymentIntent({
        receipt_email: user.email,
        amount: amount,
        card_id: model.cardId!,
        customer_id: model.stripeCustomerId,
      });
      model.paymentIntentId = paymentIntentResult.id;
      model.client_secret = paymentIntentResult.client_secret!;

      const cartModelResult = await cartService.getCart(user.id);
      if (cartModelResult) {
        const products = cartModelResult.products.map((product) => ({
          product: product.product._id,
          qty: product.qty,
          amount: product.product.productSalePrice,
        }));
        const grandTotal = products.reduce(
          (total, product) => total + product.amount!,
          0,
        );
        const order = new orderModel({
          userId: cartModelResult.userId,
          products,
          orderStatus: "pending",
          grandTotal,
        });
        const orderResult = await order.save();
        model.orderId = orderResult._id;
      }
      return model;
    } catch (err) {
      throw new Error(`${err}`);
    }
  },

  updateOrder: async (
    params: UpdateOrderParams,
  ): Promise<OrderModel | "order failed"> => {
    try {
      const model: OrderModel = {
        orderStatus: params.status,
        transactionId: params.transactionId,
      };
      const updatedOrder = await orderModel.findByIdAndUpdate(
        params.orderId,
        model,
        { useFindAndModify: false, new: true },
      );
      if (!updatedOrder) {
        return "order failed";
      }
      if (params.status === "success") {
        // clear the cart
      }
      return updatedOrder;
    } catch (err) {
      throw new Error(`${err}`);
    }
  },

  getOrders: async (userId: string): Promise<IOrderDocument> => {
    try {
      const orders = await orderModel.findOne({ userId }).populate({
        path: "products",
        populate: {
          path: "product",
          model: "Product",
          populate: {
            path: "category",
            model: "Category",
            select: "categoryName",
          },
        },
      });
      return orders as IOrderDocument;
    } catch (err) {
      throw new Error(`${err}`);
    }
  },
};

export default orderService;
