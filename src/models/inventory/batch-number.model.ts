import mongoose, { Model, Schema, Document, Types } from "mongoose";
import { IProductDocument } from "../product.model";

interface IBatchNumber {
  product: Types.ObjectId | IProductDocument;
  batchNumber: string;
  manufacturingDate: Date;
  expirationDate: Date;
}

interface IBatchNumberDocument extends Document, IBatchNumber {
  batchNumberId: string;
}

const batchNumberSchema = new Schema<IBatchNumberDocument>(
  {
    product: { type: Types.ObjectId, ref: "Product", required: true },
    batchNumber: { type: String, required: true, unique: true },
    manufacturingDate: { type: Date, required: true },
    expirationDate: { type: Date, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.batchNumberId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const BatchNumberModel: Model<IBatchNumberDocument> =
  mongoose.model<IBatchNumberDocument>("BatchNumber", batchNumberSchema);

export { IBatchNumber, IBatchNumberDocument, BatchNumberModel };
