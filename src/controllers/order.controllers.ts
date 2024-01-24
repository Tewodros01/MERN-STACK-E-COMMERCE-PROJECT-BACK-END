import { Response } from "express";
import { UpdateOrderParams } from "../interface/order.interface";
import { AddCardParams } from "../interface/stripe.interface";
import { IRequest } from "../interface/user.interface";
import orderService from "../services/order.service";

const orderControllers = {
  getOrders: async (req: IRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId!;
      const orders = await orderService.getOrders(userId);

      res.status(201).json({ message: "success", data: orders });
    } catch (err) {
      res.status(500).json({ message: "error", error: `${err}` });
    }
  },

  createOrder: async (req: IRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId!;
      const amount = req.body.amount;
      const model: AddCardParams = {
        card_Name: req.body.card_Name,
        card_Number: req.body.card_Number,
        card_ExpMonth: req.body.card_ExpMonth,
        card_ExpYear: req.body.card_ExpYear,
        card_CVC: req.body.card_CVC,
        customer_id: req.user?.userId!,
      };
      console.log("Card data " + model.card_ExpYear);
      const order = await orderService.createOrder(model, userId, amount);
      res.status(200).json({ message: "success", data: order });
    } catch (err) {
      res.status(500).json({ message: "error", error: `${err}` });
    }
  },

  updateOrder: async (req: IRequest, res: Response): Promise<void> => {
    try {
      const model: UpdateOrderParams = {
        orderId: req.body.orderId,
        status: req.body.status,
        transactionId: req.body.transactionId,
      };
      const updateOrder = await orderService.updateOrder(model);
      res.status(200).json({ message: "success", data: updateOrder });
    } catch (err) {
      res.status(500).json({ message: "error", error: `${err}` });
    }
  },
};

export default orderControllers;
