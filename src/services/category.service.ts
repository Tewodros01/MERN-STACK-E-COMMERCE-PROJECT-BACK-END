import {
  CategoryModel,
  ICategoryDocument,
  ICategory,
} from "../models/category.model";
import { MONGO_DB_CONFIG } from "../config/app.config";

const categoryService = {
  getCategoryById: async (id: string): Promise<ICategoryDocument> => {
    const category = await CategoryModel.findById(id).lean();
    return category as ICategoryDocument;
  },
  getAllCategories: async (params: {
    categoryName?: string;
    pageSize?: string;
    page?: string;
  }): Promise<ICategoryDocument[]> => {
    try {
      const categoryName = params.categoryName;
      const condition = categoryName
        ? {
            categoryName: { $regex: new RegExp(categoryName), $options: "i" },
          }
        : {};

      const perPage =
        Math.abs(parseInt(params.pageSize!)) || MONGO_DB_CONFIG.PAGE_SIZE;
      const page = (Math.abs(parseInt(params.page!)) || 1) - 1;

      const categories = await CategoryModel.find(
        condition,
        "categoryName categoryDescription categoryImagePath",
      )
        .limit(perPage)
        .skip(perPage * page);

      return categories as ICategoryDocument[];
    } catch (err) {
      throw new Error(`Error retrieving categories: ${err}`);
    }
  },
  createCategory: async (
    categoryType: ICategory,
  ): Promise<ICategoryDocument> => {
    const newCategory = new CategoryModel(categoryType);
    await newCategory.save();
    return newCategory as ICategoryDocument;
  },
  updateCategoryById: async (
    id: string,
    categoryType: ICategory,
  ): Promise<ICategoryDocument> => {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      categoryType,
      {
        new: true,
      },
    ).lean();
    return updatedCategory as ICategoryDocument;
  },
  deleteCategoryById: async (id: string): Promise<ICategoryDocument> => {
    const category = await CategoryModel.findByIdAndDelete(id).lean();
    return category as ICategoryDocument;
  },
};

export default categoryService;
