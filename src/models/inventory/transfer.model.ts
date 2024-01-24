import mongoose, { Model, Schema, Document, Types } from "mongoose";

interface ITransfer {
  sourceWarehouse: Types.ObjectId;
  destinationWarehouse: Types.ObjectId;
  products: Array<{ product: Types.ObjectId; transferredQuantity: number }>;
  transferDate: Date;
}

interface ITransferDocument extends Document, ITransfer {
  transferId: string;
}

const transferSchema: Schema = new Schema(
  {
    sourceWarehouse: { type: Types.ObjectId, required: true, ref: "Warehouse" },
    destinationWarehouse: {
      type: Types.ObjectId,
      required: true,
      ref: "Warehouse",
    },
    products: [
      {
        product: { type: Types.ObjectId, required: true, ref: "Product" },
        transferredQuantity: { type: Number, required: true },
      },
    ],
    transferDate: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.transferId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const transferModel: Model<ITransferDocument> =
  mongoose.model<ITransferDocument>("Transfer", transferSchema);

export { transferModel, ITransfer, ITransferDocument };
