import { Router } from "express";
import reviewProductController from "../../controllers/review.product.controllers";
const review_product_router: Router = Router();

review_product_router.post("/", reviewProductController.createReview);
review_product_router.get("/:id", reviewProductController.getReviewsByProduct);
review_product_router.put("/:id", reviewProductController.updateReview);
review_product_router.delete("/:id", reviewProductController.deleteReview);

export default review_product_router;
