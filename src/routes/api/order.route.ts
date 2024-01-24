import { Router } from "express";
import orderControllers from "../../controllers/order.controllers";
import { authenticationToken } from "../../middleware/auth";

const order_router: Router = Router();

order_router.get("/", authenticationToken, orderControllers.getOrders);
order_router.post("/", authenticationToken, orderControllers.createOrder);
order_router.put("/", authenticationToken, orderControllers.updateOrder);

export default order_router;
