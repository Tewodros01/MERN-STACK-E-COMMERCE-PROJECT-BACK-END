import mongoose, { Model, Schema, Document, Types } from "mongoose";
import { IProductDocument } from "../product.model";

interface IPurchaseOrderProduct {
  product: Schema.Types.ObjectId | IProductDocument;
  quantity: number;
  type: string; // Add a 'type' field for categorizing products
}

interface IPurchaseOrder {
  supplier: Schema.Types.ObjectId;
  products: IPurchaseOrderProduct[];
  orderDate: Date;
  expectedDeliveryDate: Date;
  status: string;
}

interface IPurchaseOrderDocument extends Document, IPurchaseOrder {
  purchaseOrderId: string;
}

const purchaseOrderSchema = new Schema<IPurchaseOrderDocument>(
  {
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        type: { type: String, required: true }, // Type of the product in the order
      },
    ],
    orderDate: { type: Date, required: true },
    expectedDeliveryDate: { type: Date, required: true },
    status: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.purchaseOrderId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const PurchaseOrderModel: Model<IPurchaseOrderDocument> =
  mongoose.model<IPurchaseOrderDocument>("PurchaseOrder", purchaseOrderSchema);

export {
  IPurchaseOrder,
  IPurchaseOrderDocument,
  PurchaseOrderModel,
  IPurchaseOrderProduct,
};
