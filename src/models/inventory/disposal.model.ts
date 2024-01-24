import mongoose, { Model, Schema, Document, Types } from "mongoose";

interface IDisposal {
  disposedBy: Types.ObjectId;
  products: Array<{
    product: Types.ObjectId;
    quantity: number;
    disposalReason: string;
  }>;
  disposalDate: Date;
}

interface IDisposalDocument extends Document, IDisposal {
  disposalId: string;
}

const disposalSchema: Schema = new Schema(
  {
    disposedBy: { type: Types.ObjectId, required: true, ref: "User" },
    products: [
      {
        product: { type: Types.ObjectId, required: true, ref: "Product" },
        quantity: { type: Number, required: true },
        disposalReason: { type: String, required: true },
      },
    ],
    disposalDate: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.disposalId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const disposalModel: Model<IDisposalDocument> =
  mongoose.model<IDisposalDocument>("Disposal", disposalSchema);

export { disposalModel, IDisposal, IDisposalDocument };
