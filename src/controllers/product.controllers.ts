import { Request, Response } from "express";
import productService from "../services/product.service";
import { IProduct } from "../models/product.model";
import path from "path";
import fs from "fs-extra";

const productControllers = {
  createProduct: async (req: Request, res: Response): Promise<void> => {
    try {
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
      const product: IProduct = {
        productName: req.body.productName,
        category: req.body.category,
        productDescription: req.body.productDescription,
        productShortDescription: req.body.productShortDescription,
        productPrice: req.body.productPrice,
        productSalePrice: req.body.productSalePrice,
        productImagePath: path,
        productSKU: req.body.productSKU,
        productType: req.body.productType,
        stockStatus: req.body.stockStatus,
      };
      const newProduct = await productService.createProduct(product);
      res.json({ message: "success", data: newProduct });
    } catch (err) {
      res.status(400).json({ message: "error", error: `${err}` });
    }
  },

  getAllProducts: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await productService.getAllProducts({
        productIds: req.query.productIds?.toString(),
        pageSize: req.query.pageSize?.toString(),
        page: req.query.page?.toString(),
        productName: req.query.productName?.toString(),
        categoryId: req.query.categoryId?.toString(),
        sortBy: req.query.sortBy?.toString(),
      });
      res.json({ message: "success", data: product });
    } catch (err) {
      res.status(400).json({ message: "error", error: `${err}` });
    }
  },

  getProductById: async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await productService.getProductById(req.params.id);
      res.json({ message: "success", data: category });
    } catch (err) {
      res.status(400).json({ message: "error", error: `${err}` });
    }
  },

  updateProductById: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const product: IProduct = {
        productName: req.body.productName,
        category: req.body.category,
        productDescription: req.body.productDescription,
        productShortDescription: req.body.productShortDescription,
        productPrice: req.body.productPrice,
        productSalePrice: req.body.productSalePrice,
        productSKU: req.body.productSKU,
        productType: req.body.productType,
        stockStatus: req.body.stockStatus,
      };
      const updatedCategory = await productService.updateProduct(id, product);
      res.json({ message: "success", data: updatedCategory });
    } catch (err) {
      res.status(400).json({ message: "error", error: `${err}` });
    }
  },

  deleteProductById: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await productService.deleteProduct(req.params.id);
      if (product && product.productImagePath) {
        await fs.unlink(path.resolve(product.productImagePath));
      }
      res.json({ message: "success", data: product });
    } catch (err) {
      res.status(400).json({ message: "error", error: `${err}` });
    }
  },
};

export default productControllers;
