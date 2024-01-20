import mongoose, { Model, Schema, Document } from "mongoose";

interface IRelatedProduct {
  product: mongoose.Types.ObjectId;
  relatedProduct: mongoose.Types.ObjectId;
}

interface IRelatedProductDocument extends Document, IRelatedProduct {}

const relatedProductSchema = new Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
    relatedProduct: { type: mongoose.Types.ObjectId, ref: "Product" },
  },
  {
    toJSON: {
      transform: function (dec, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const RelatedProductModel: Model<IRelatedProductDocument> =
  mongoose.model<IRelatedProductDocument>(
    "RelatedProduct",
    relatedProductSchema
  );
export { IRelatedProduct, IRelatedProductDocument, RelatedProductModel };
