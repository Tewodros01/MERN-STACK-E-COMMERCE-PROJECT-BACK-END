import { Router } from "express";
import {
  addCartItem,
  getCarts,
  removeProductFromCart,
} from "../../controllers/cart.controllers";
import { authenticationToken } from "../../middleware/auth";

const cart_router: Router = Router();
cart_router.get("/", authenticationToken, getCarts);
cart_router.post("/", authenticationToken, addCartItem);
cart_router.delete("/", authenticationToken, removeProductFromCart);

export default cart_router;
