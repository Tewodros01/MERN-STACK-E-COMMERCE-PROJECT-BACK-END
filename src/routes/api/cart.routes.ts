import { Router } from "express";
import cartControllers from "../../controllers/cart.controllers";
import { authenticationToken } from "../../middleware/auth";

const cart_router: Router = Router();

cart_router.get("/", authenticationToken, cartControllers.getCarts);
cart_router.post("/", authenticationToken, cartControllers.addCartItem);
cart_router.delete(
  "/",
  authenticationToken,
  cartControllers.removeProductFromCart,
);

export default cart_router;
