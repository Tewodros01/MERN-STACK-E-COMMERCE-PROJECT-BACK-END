import { Router } from "express";
import cart_router from "./api/cart.routes";
import category_router from "./api/category.route.api";
import order_router from "./api/order.route";
import product_router from "./api/product.route.api";
import related_product from "./api/related.product.route";
import product_slider_route from "./api/product_slider_route";
import user_router from "./api/user.routes";
import refresh_router from "./api/refresh.token.routes";
import register_router from "./api/register.routes";
import auth_router from "./api/auth.routes";
import review_product_router from "./api/review.product.router";
import message_router from "./api/message.route";

const routes: Router = Router();

routes.use("/category", category_router);
routes.use("/product", product_router);
routes.use("/user", user_router);
routes.use("/refresh", refresh_router);
routes.use("/register", register_router);
routes.use("/auth", auth_router);
routes.use("/slider", product_slider_route);
routes.use("/related-product", related_product);
routes.use("/cart", cart_router);
routes.use("/order", order_router);
routes.use("/review", review_product_router);
routes.use("/messages", message_router);

export default routes;
