import mongoose, { Model, Schema, Document, Types } from "mongoose";
import { IProductDocument } from "../product.model";

interface IInvoiceProduct {
  product: Schema.Types.ObjectId | IProductDocument;
  quantity: number;
  unitPrice: number;
}

interface IInvoice {
  customer: Schema.Types.ObjectId;
  products: IInvoiceProduct[];
  totalAmount: number;
  invoiceDate: Date;
  dueDate: Date;
  paymentStatus: string;
}

interface IInvoiceDocument extends Document, IInvoice {
  invoiceId: string;
}

const invoiceSchema = new Schema<IInvoiceDocument>(
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
        unitPrice: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    invoiceDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    paymentStatus: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.invoiceId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const InvoiceModel: Model<IInvoiceDocument> = mongoose.model<IInvoiceDocument>(
  "Invoice",
  invoiceSchema,
);

export { IInvoice, IInvoiceDocument, InvoiceModel, IInvoiceProduct };
