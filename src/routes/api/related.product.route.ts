import { Router } from "express";
import relatedProductControllers from "../../controllers/related.product.controllers";

const related_product: Router = Router();

related_product.get("/", relatedProductControllers.getRelatedProducts);
related_product.post("/", relatedProductControllers.addRelatedProduct);
related_product.delete("/:id", relatedProductControllers.removeRelatedProduct);

export default related_product;
