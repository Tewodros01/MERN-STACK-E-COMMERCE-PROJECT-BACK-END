import mongoose, { Model, Schema, Document, Types } from "mongoose";
import { IProductDocument } from "../product.model";

interface IReturnOrderProduct {
  product: Schema.Types.ObjectId | IProductDocument;
  quantity: number;
}

interface IReturnOrder {
  customer: Schema.Types.ObjectId; // Reference to Customer model (assuming Schema.Types.ObjectId is used)
  products: IReturnOrderProduct[];
  reason: string;
  status: string;
  returnDate: Date;
}

interface IReturnOrderDocument extends Document, IReturnOrder {
  returnOrderId: string;
}

const returnOrderSchema = new Schema<IReturnOrderDocument>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    reason: { type: String, required: true },
    status: { type: String, required: true },
    returnDate: { type: Date, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.returnOrderId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const ReturnOrderModel: Model<IReturnOrderDocument> =
  mongoose.model<IReturnOrderDocument>("ReturnOrder", returnOrderSchema);

export {
  IReturnOrder,
  IReturnOrderDocument,
  ReturnOrderModel,
  IReturnOrderProduct,
};
