import { Router } from "express";
import uploads from "../../middleware/category.upload";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../../controllers/category.controllers";

const category_router = Router();

category_router.get("/", getCategories);
category_router.post("/", uploads.single("image"), createCategory);
category_router.get("/:id", getCategoryById);
category_router.put("/:id", updateCategoryById);
category_router.delete("/:id", deleteCategoryById);

export default category_router;
