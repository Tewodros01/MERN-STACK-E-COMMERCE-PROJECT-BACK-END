import mongoose, { Model, Schema, Document, Types } from "mongoose";

interface IReceived {
  supplier: Types.ObjectId;
  invoiceNumber: string;
  billNumber: string;
  insurancePolicyNumber: string;
  binLocation: string;
  unit: string;
  unitCost: number;
  products: Array<{
    product: Types.ObjectId;
    quantity: number;
    invoicedQty: number;
    receivedQty: number;
    dspQty: number;
    dspReason: string;
  }>;
  receivedDate: Date;
}

interface IReceivedDocument extends Document, IReceived {
  receivedId: string;
}

const receivedSchema: Schema = new Schema(
  {
    supplier: { type: Types.ObjectId, required: true, ref: "Supplier" },
    invoiceNumber: { type: String, required: true },
    billNumber: { type: String, required: true },
    insurancePolicyNumber: { type: String, required: true },
    binLocation: { type: String, required: true },
    unit: { type: String, required: true },
    unitCost: { type: Number, required: true },
    products: [
      {
        product: { type: Types.ObjectId, required: true, ref: "Product" },
        quantity: { type: Number, required: true },
        invoicedQty: { type: Number, required: true },
        receivedQty: { type: Number, required: true },
        dspQty: { type: Number, required: true },
        dspReason: { type: String, required: true },
      },
    ],
    receivedDate: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.receivedId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const receivedModel: Model<IReceivedDocument> =
  mongoose.model<IReceivedDocument>("Received", receivedSchema);

export { receivedModel, IReceived, IReceivedDocument };
