import mongoose, { Model, Schema, Document, Types } from "mongoose";

interface IQuantityAdjustment {
  adjustedBy: Types.ObjectId;
  products: Array<{
    product: Types.ObjectId;
    quantity: number;
    reason: string;
    location?: Types.ObjectId;
  }>;
  adjustmentDate: Date;
}

interface IQuantityAdjustmentDocument extends Document, IQuantityAdjustment {
  adjustmentId: string;
}

const quantityAdjustmentSchema: Schema = new Schema(
  {
    adjustedBy: { type: Types.ObjectId, required: true, ref: "User" },
    products: [
      {
        product: { type: Types.ObjectId, required: true, ref: "Product" },
        quantity: { type: Number, required: true },
        reason: { type: String, required: true },
        location: { type: Types.ObjectId, ref: "Location" }, // Optional location information
      },
    ],
    adjustmentDate: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.adjustmentId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const quantityAdjustmentModel: Model<IQuantityAdjustmentDocument> =
  mongoose.model<IQuantityAdjustmentDocument>(
    "QuantityAdjustment",
    quantityAdjustmentSchema,
  );

export {
  quantityAdjustmentModel,
  IQuantityAdjustment,
  IQuantityAdjustmentDocument,
};
