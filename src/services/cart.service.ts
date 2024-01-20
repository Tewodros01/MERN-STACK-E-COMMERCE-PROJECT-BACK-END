import { CartModel, ICartDocument } from "../models/cart.models";
import { ICartItem } from "../interface/cart.interface";

const cartService = {
  addCart: async (
    userId: string,
    product: ICartItem,
  ): Promise<ICartDocument> => {
    try {
      const cart = await CartModel.findOne({ userId });

      if (cart) {
        // if cart already exists, find if product is already present
        const existingProductIndex = cart.products.findIndex(
          (item) => item.product.toString() === product.product.toString(),
        );
        if (existingProductIndex !== -1) {
          // if product already exists in cart, update its quantity
          cart.products[existingProductIndex].qty += product.qty;
        } else {
          // if product does not exist in cart, add it
          cart.products.push(product);
        }
        const cartItem = await cart.save();
        return cartItem as ICartDocument;
      } else {
        // if cart does not exist, create a new one
        const newCart = new CartModel({
          userId,
          products: [product],
        });

        return await newCart.save();
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
  getCart: async (userId?: string): Promise<ICartDocument> => {
    try {
      const cart = await CartModel.findOne({ userId: userId })
        .populate({
          path: "products",
          populate: {
            path: "product",
            model: "Product",
            select:
              "productName productPrice , productSalePrice productImagePath",
            populate: {
              path: "category",
              model: "Category",
              select: "categoryName",
            },
          },
        })
        .lean();
      if (!cart) {
        throw new Error(`Cart not found`);
      }
      // Convert cart._id to cartId
      const cartId = cart._id.toString();

      // Add cartId property to the cart object
      const cartWithId = { ...cart, cartId };

      return cartWithId as ICartDocument;
    } catch (err) {
      throw new Error(`Could not get the cart`);
    }
  },
  removeCart: async (
    userId: string,
    productId: string,
    qty: number,
  ): Promise<ICartDocument> => {
    const cart = await CartModel.findOne({ userId }).exec();
    try {
      if (cart) {
        // Check if the product is in the cart
        const productIndex = cart.products.findIndex(
          (item) => item.product.toString() === productId,
        );
        if (productIndex !== -1) {
          // If the product is in the cart, decrease the quantity by 1
          if (cart.products[productIndex].qty > 1) {
            cart.products[productIndex].qty -= qty;
          } else {
            // If the quantity is 1, remove the product from the cart
            cart.products.splice(productIndex, 1);
          }
          await cart.save();
          return cart;
        } else {
          // If the product is not in the cart, return the current cart
          return cart;
        }
      } else {
        throw new Error(`Empty cart`);
      }
    } catch (err) {
      throw new Error(`Could not remove product`);
    }
  },
};

export default cartService;
