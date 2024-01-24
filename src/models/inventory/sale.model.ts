import mongoose, { Model, Schema, Document, Types } from "mongoose";

interface IPaymentDetail {
  method: string;
  amount: number;
}

interface ISale {
  soldBy: Types.ObjectId;
  customer: Types.ObjectId;
  products: Array<{
    product: Types.ObjectId;
    quantity: number;
    unitPrice: number;
  }>;
  totalAmount: number;
  tax: number;
  discount: number;
  grandTotal: number;
  paymentDetails: Array<IPaymentDetail>;
}

interface ISaleDocument extends Document, ISale {
  saleId: string;
}

const paymentDetailSchema: Schema = new Schema(
  {
    method: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false },
);

const saleSchema: Schema = new Schema(
  {
    soldBy: { type: Types.ObjectId, required: true, ref: "User" },
    customer: { type: Types.ObjectId, required: true, ref: "Customer" },
    products: [
      {
        product: { type: Types.ObjectId, required: true, ref: "Product" },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
      },
    ],
    saleDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },
    paymentDetails: { type: [paymentDetailSchema], required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.saleId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const saleModel: Model<ISaleDocument> = mongoose.model<ISaleDocument>(
  "Sale",
  saleSchema,
);

export { saleModel, ISale, ISaleDocument, IPaymentDetail };
