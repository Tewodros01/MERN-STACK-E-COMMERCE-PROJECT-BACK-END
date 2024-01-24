import mongoose, { Model, Schema, Document, Types } from "mongoose";

interface IPriceAdjustment {
  adjustedBy: Types.ObjectId;
  products: Array<{
    product: Types.ObjectId;
    newPrice: number;
    reason: string;
  }>;
  adjustmentDate: Date;
}

interface IPriceAdjustmentDocument extends Document, IPriceAdjustment {
  adjustmentId: string;
}

const priceAdjustmentSchema: Schema = new Schema(
  {
    adjustedBy: { type: Types.ObjectId, required: true, ref: "User" },
    products: [
      {
        product: { type: Types.ObjectId, required: true, ref: "Product" },
        newPrice: { type: Number, required: true },
        reason: { type: String, required: true },
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

const priceAdjustmentModel: Model<IPriceAdjustmentDocument> =
  mongoose.model<IPriceAdjustmentDocument>(
    "PriceAdjustment",
    priceAdjustmentSchema,
  );

export { priceAdjustmentModel, IPriceAdjustment, IPriceAdjustmentDocument };
