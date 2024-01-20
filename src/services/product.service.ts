import { FilterQuery } from "mongoose";
import {
  productModel,
  IProductDocument,
  IProduct,
} from "../models/product.model";
import { MONGO_DB_CONFIG } from "../config/app.config";
import { IRelatedProduct } from "../models/related.product.model";
import { GetAllProductsParams } from "../interface/product.inteface";

const productService = {
  getAllProducts: async (
    params: GetAllProductsParams,
  ): Promise<IProductDocument[]> => {
    try {
      console.log("Hi there, I'm here");
      const productId: string = params.productIds ?? "";
      const productName: string = params.productName ?? "";
      const categoryId: string = params.categoryId ?? "";
      const condition: FilterQuery<IProduct> = {};

      if (productName) {
        condition.productName = {
          $regex: new RegExp(productName, "i"),
        };
      }
      if (categoryId) {
        condition.category = categoryId;
      }
      if (productId) {
        condition._id = {
          $in: productId.split(","),
        };
      }

      const perPage: number =
        Math.abs(parseInt(params.pageSize ?? "", 10)) ||
        MONGO_DB_CONFIG.PAGE_SIZE;
      const page: number = (Math.abs(parseInt(params.page ?? "", 10)) || 1) - 1;

      // Provide a default sorting field if params.sortBy is undefined
      const sortField: string = params.sortBy || "createdAt";

      const products: unknown | IProductDocument[] = await productModel
        .find(condition)
        .select(
          "productId productName productShortDescription productDescription productPrice productSalePrice productImagePath productSKU productType stackStatus createdAt updatedAt",
        )
        .sort(sortField)
        .populate(
          "category",
          "categoryName categoryDescription categoryImagePath",
        )
        .populate("relatedProducts", "relatedProduct")
        .limit(perPage)
        .skip(perPage * page)
        .exec();

      let modifiedProducts = (
        Array.isArray(products) ? products : [products]
      ).map((p) => {
        if (p.relatedProducts.length > 0) {
          p.relatedProducts = p.relatedProducts.map(
            (x: { relatedProduct: IRelatedProduct }) => x.relatedProduct,
          );
        }
        return p;
      });

      return modifiedProducts;
    } catch (err) {
      throw new Error(` ${err}`);
    }
  },

  createProduct: async (productType: IProduct): Promise<IProductDocument> => {
    try {
      const newProduct: IProductDocument = new productModel(productType);
      await newProduct.save();
      return newProduct;
    } catch (err) {
      throw new Error(`${err}`);
    }
  },

  getProductById: async (productId: string): Promise<IProductDocument> => {
    try {
      const product = await productModel
        .findById(productId)
        .populate(
          "category",
          "categoryName categoryDescription categoryImagePath",
        )
        .populate("relatedProducts", "relatedProduct");
      if (!product) {
        throw new Error(`Product is null`);
      }
      product.relatedProducts =
        product.relatedProducts.map(
          (x) => x.relatedProduct as unknown as IRelatedProduct,
        ) ?? [];

      return product;
    } catch (err) {
      throw new Error(`${err}`);
    }
  },

  updateProduct: async (
    id: string,
    productType: IProduct,
  ): Promise<IProductDocument> => {
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(
        id,
        productType,
        {
          new: true,
        },
      );
      return updatedProduct as IProductDocument;
    } catch (err) {
      throw new Error(`${err}`);
    }
  },

  deleteProduct: async (id: string): Promise<IProductDocument | null> => {
    try {
      const product: IProductDocument | null = await productModel
        .findByIdAndDelete(id)
        .lean();
      return product;
    } catch (err) {
      throw new Error(`${err}`);
    }
  },
};

export default productService;
