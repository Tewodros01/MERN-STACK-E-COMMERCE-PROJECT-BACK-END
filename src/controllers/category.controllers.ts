import { Request, Response } from "express";
import categoryService from "../services/category.service";
import path from "path";
import fs from "fs-extra";
import { ICategory } from "../models/category.model";

export async function createCategory(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const filePath = req.file?.path?.replace(/\\/g, "") || "";
    const categoryType: ICategory = {
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
      categoryImagePath: filePath,
    };
    const newCategory = await categoryService.createCategory(categoryType);
    res.json({ message: "success", data: newCategory });
  } catch (error) {
    res.status(400).json({ message: "error", error: `${error}` });
  }
}

export async function getCategories(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { pageSize, page, categoryName } = req.query;
    const categories = await categoryService.getAllCategories({
      pageSize: pageSize?.toString(),
      page: page?.toString(),
      categoryName: categoryName?.toString(),
    });
    res.json({ message: "success", data: categories });
  } catch (error) {
    res.status(400).json({ message: "error", error: `${error}` });
  }
}

export async function getCategoryById(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.json({ message: "success", data: category });
  } catch (error) {
    res.status(400).json({ message: "error", error: `${error}` });
  }
}

export async function updateCategoryById(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { id } = req.params;
    const categoryType: ICategory = {
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
    };
    const updatedCategory = await categoryService.updateCategoryById(
      id,
      categoryType,
    );
    res.json({ message: "success", data: updatedCategory });
  } catch (error) {
    res.status(400).json({ message: "error", error: `${error}` });
  }
}

export async function deleteCategoryById(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const category = await categoryService.deleteCategoryById(req.params.id);
    if (category && category.categoryImagePath) {
      await fs.unlink(path.resolve(category.categoryImagePath));
    } else {
      res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "success", data: category });
  } catch (error) {
    res.status(400).json({ message: "error", error: `${error}` });
  }
}
