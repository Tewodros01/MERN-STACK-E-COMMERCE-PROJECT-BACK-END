import mongoose, { Model, Schema, Document, Types } from "mongoose";

interface IProcurement {
  purchasedBy: Types.ObjectId;
  supplier: Types.ObjectId;
  products: Array<{
    product: Types.ObjectId;
    requestedQty: number;
    suggestedCost: number;
  }>;
  procurementDate: Date;
  totalCost: number;
}

interface IProcurementDocument extends Document, IProcurement {
  procurementId: string;
}

const procurementSchema: Schema = new Schema(
  {
    purchasedBy: { type: Types.ObjectId, required: true, ref: "User" },
    supplier: { type: Types.ObjectId, required: true, ref: "Supplier" },
    products: [
      {
        product: { type: Types.ObjectId, required: true, ref: "Product" },
        requestedQty: { type: Number, required: true },

        suggestedCost: { type: Number, required: true },
      },
    ],
    procurementDate: { type: Date, default: Date.now },
    totalCost: { type: Number, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.procurementId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const procurementModel: Model<IProcurementDocument> =
  mongoose.model<IProcurementDocument>("Procurement", procurementSchema);

export { procurementModel, IProcurement, IProcurementDocument };
