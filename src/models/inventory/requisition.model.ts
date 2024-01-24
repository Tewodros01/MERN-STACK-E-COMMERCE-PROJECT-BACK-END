import mongoose, { Model, Schema, Document, Types } from "mongoose";

interface IRequisition {
  requestedBy: Types.ObjectId;
  products: Array<{ product: Types.ObjectId; quantity: number }>;
  requisitionDate: Date;
  status: string; // Pending, Approved, Rejected, etc.
  notes: string;
  requisitionSource: string; // Source of the requisition (e.g., Department, Location, etc.)
}

interface IRequisitionDocument extends Document, IRequisition {
  requisitionId: string;
}

const requisitionSchema: Schema = new Schema(
  {
    requestedBy: { type: Types.ObjectId, required: true, ref: "User" },
    products: [
      {
        product: { type: Types.ObjectId, required: true, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    requisitionDate: { type: Date, default: Date.now },
    status: { type: String, default: "Pending" },
    notes: { type: String },
    requisitionSource: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.requisitionId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const requisitionModel: Model<IRequisitionDocument> =
  mongoose.model<IRequisitionDocument>("Requisition", requisitionSchema);

export { requisitionModel, IRequisition, IRequisitionDocument };
