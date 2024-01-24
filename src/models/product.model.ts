import mongoose, { Model, Schema, Document, Types } from "mongoose";
import { IRelatedProduct } from "./related.product.model";

interface IProduct {
  productName: string;
  category?: Types.ObjectId;
  productShortDescription: string;
  productDescription: string;
  productPrice: number;
  productSalePrice?: number;
  productImagePath?: string;
  productSKU?: string;
  productType: string;
  stockStatus: boolean;
}

interface IProductDocument extends Document, IProduct {
  productId: string;
  relatedProducts: IRelatedProduct[];
}

const productSchema: Schema = new Schema(
  {
    productName: { type: String, required: true },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    productShortDescription: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productSalePrice: { type: Number, default: 0 },
    productImagePath: { type: String },
    productSKU: { type: String, required: true },
    productType: { type: String, default: "Simple" },
    stockStatus: { type: String, default: "IN" },
    relatedProducts: [{ type: Types.ObjectId, ref: "RelatedProduct" }],
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.productId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const productModel: Model<IProductDocument> = mongoose.model<IProductDocument>(
  "Product",
  productSchema,
);

export { productModel, IProduct, IProductDocument };

// please based on this model defination write a controller and service to  slect all product , slect product by id by populating products.relatedProduct in the service please elect product by id and in product by id select relatedproducts id only
