import { Router } from "express";
import {
  createOrder,
  getOrders,
  updateOrder,
} from "../../controllers/order.controllers";
import { authenticationToken } from "../../middleware/auth";

const order_router: Router = Router();

order_router.get("/", authenticationToken, getOrders);
order_router.post("/", authenticationToken, createOrder);
order_router.put("/", authenticationToken, updateOrder);

export default order_router;
