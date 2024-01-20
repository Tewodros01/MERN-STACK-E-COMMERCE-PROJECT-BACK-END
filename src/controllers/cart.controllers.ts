import { Response } from "express";
import { IRequest } from "../interface/user.interface";
import cartService from "../services/cart.service";

export async function addCartItem(req: IRequest, res: Response) {
  try {
    const userId = req.user!.userId.toString();
    const product = req.body.product;
    const cart = await cartService.addCart(userId, product);
    res.status(201).json({ message: "success", data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `${error}` });
  }
}

export async function getCarts(req: IRequest, res: Response): Promise<void> {
  try {
    const carts = await cartService.getCart(req.user?.userId);
    console.log(`Cart in controllers ${carts}`);
    res.json({ message: "success", data: carts });
  } catch (err) {
    res.status(400).json({ message: "error", error: `${err}` });
  }
}
export async function removeProductFromCart(
  req: IRequest,
  res: Response,
): Promise<void> {
  const userId = req.user!.userId.toString();
  const { productId, qty } = req.body;
  try {
    const cart = await cartService.removeCart(userId, productId, qty);
    if (cart) {
      res.status(200).json({ message: "success", data: cart });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
