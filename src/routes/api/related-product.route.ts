import { Router } from "express";
import {
  addRelatedProduct,
  removeRelatedProduct,
  getRelatedProducts,
} from "../../controllers/related-product.controllers";

const related_product: Router = Router();

related_product.get("/", getRelatedProducts);
related_product.post("/", addRelatedProduct);
related_product.delete("/:id", removeRelatedProduct);

export default related_product;
