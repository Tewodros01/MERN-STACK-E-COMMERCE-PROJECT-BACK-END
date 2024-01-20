import { productModel } from "../models/product.model";
import {
  IRelatedProduct,
  IRelatedProductDocument,
  RelatedProductModel,
} from "../models/related.product.model";

const relatedProductService = {
  addRelatedProduct: async (
    relatedProduct: IRelatedProduct,
  ): Promise<IRelatedProductDocument> => {
    try {
      if (!relatedProduct.product) {
        throw new Error(`Product is required`);
      }
      if (!relatedProduct.relatedProduct) {
        throw new Error(`Related Product is required`);
      }

      const newRelatedProduct = new RelatedProductModel(relatedProduct);
      await newRelatedProduct.save();

      const updatedProduct = await productModel.findByIdAndUpdate(
        relatedProduct.product,
        {
          $addToSet: {
            relatedProducts: newRelatedProduct,
          },
        },
        { new: true },
      );

      if (!updatedProduct) {
        throw new Error(`Product not found`);
      }

      return newRelatedProduct;
    } catch (err) {
      throw new Error(`Error adding related product: ${err}`);
    }
  },

  getRelatedProducts: async (): Promise<IRelatedProductDocument[]> => {
    try {
      const relatedProducts = await RelatedProductModel.find();
      return relatedProducts as IRelatedProductDocument[];
    } catch (err) {
      throw new Error(`${err}`);
    }
  },

  removeRelatedProduct: async (
    id: string,
  ): Promise<IRelatedProductDocument | null> => {
    try {
      const relatedProduct = RelatedProductModel.findByIdAndDelete(id).lean();
      return relatedProduct;
    } catch (err) {
      throw new Error(`Error can not remove related product ${err}`);
    }
  },
};

export default relatedProductService;
