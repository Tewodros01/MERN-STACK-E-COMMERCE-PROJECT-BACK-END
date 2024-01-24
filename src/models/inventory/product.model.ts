import mongoose, { Model, Schema, Document } from "mongoose";

interface IProduct {
  productName: string;
  description: string;
  category: string;
  brand: string;
  unitOfMeasure: string;
  costPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  reorderLevel: number;
  supplierInfo: {
    supplierId: string;
    supplierName: string;
    // Add other supplier information if needed
  };
}

interface IProductDocument extends Document, IProduct {
  productId: string;
}

const productSchema = new Schema<IProductDocument>(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    unitOfMeasure: { type: String, required: true },
    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    reorderLevel: { type: Number, default: 0 },
    supplierInfo: {
      supplierId: { type: String, required: true },
      supplierName: { type: String, required: true },
      // Add other supplier information if needed
    },
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

const ProductModel: Model<IProductDocument> = mongoose.model<IProductDocument>(
  "Product",
  productSchema,
);

export { IProduct, IProductDocument, ProductModel };
