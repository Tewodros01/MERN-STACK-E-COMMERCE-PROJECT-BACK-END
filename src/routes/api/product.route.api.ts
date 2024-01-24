import { Router } from "express";
import uploads from "../../middleware/product.upload";
import productControllers from "../../controllers/product.controllers";

const product_router: Router = Router();

product_router.get("/", productControllers.getAllProducts);
product_router.post(
  "/",
  uploads.single("image"),
  productControllers.createProduct,
);
product_router.get("/:id", productControllers.getProductById);
product_router.put("/:id", productControllers.updateProductById);
product_router.delete("/:id", productControllers.deleteProductById);

export default product_router;
