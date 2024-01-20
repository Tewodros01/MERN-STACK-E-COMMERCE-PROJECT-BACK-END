import { Router } from "express";
import uploads from "../../middleware/product.upload";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} from "../../controllers/product.controllers";

const product_router: Router = Router();

product_router.get("/", getAllProducts);
product_router.post("/", uploads.single("image"), createProduct);
product_router.get("/:id", getProductById);
product_router.put("/:id", updateProductById);
product_router.delete("/:id", deleteProductById);

export default product_router;
