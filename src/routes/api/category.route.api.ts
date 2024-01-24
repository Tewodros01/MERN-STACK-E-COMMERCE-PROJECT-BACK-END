import { Router } from "express";
import uploads from "../../middleware/category.upload";
import categoryControllers from "../../controllers/category.controllers";

const category_router = Router();

category_router.get("/", categoryControllers.getCategories);
category_router.post(
  "/",
  uploads.single("image"),
  categoryControllers.createCategory,
);
category_router.get("/:id", categoryControllers.getCategoryById);
category_router.put("/:id", categoryControllers.updateCategoryById);
category_router.delete("/:id", categoryControllers.deleteCategoryById);

export default category_router;
