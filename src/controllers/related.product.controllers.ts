import { IRelatedProduct } from "../models/related.product.model";
import { Request, Response } from "express";
import relatedProductService from "../services/related.product.service";

const relatedProductControllers = {
  addRelatedProduct: async (req: Request, res: Response) => {
    try {
      const relatedProduct: IRelatedProduct = {
        product: req.body.product,
        relatedProduct: req.body.relatedProduct,
      };
      const newRelatedProduct =
        await relatedProductService.addRelatedProduct(relatedProduct);
      res.json({ message: "success", data: newRelatedProduct });
    } catch (err) {
      res.json({ message: "error", data: `${err}` });
    }
  },

  getRelatedProducts: async (req: Request, res: Response) => {
    try {
      const relatedproducts = await relatedProductService.getRelatedProducts();
      res.json({ message: "success", data: relatedproducts });
    } catch (err) {
      res.json({ message: "error", data: `${err}` });
    }
  },

  removeRelatedProduct: async (req: Request, res: Response) => {
    try {
      console.log("Hi from controllers");
      const deletedRelatedProduct =
        await relatedProductService.removeRelatedProduct(req.params.id);
      res.json({ message: "success", data: deletedRelatedProduct });
    } catch (err) {
      throw new Error(`Colud not delete ${err}`);
    }
  },
};

export default relatedProductControllers;
