import mongoose, { Document, Schema, model, Model } from "mongoose";

interface ICoupon {
  code: string;
  discount: number;
  expiryDate: Date;
  isUsed: boolean;
}
interface ICouponDocument extends Document, ICoupon {
  couponId: string;
}

const couponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    isUsed: { type: Boolean, default: false },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.couponId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const Coupon: Model<ICouponDocument> = mongoose.model<ICouponDocument>(
  "Coupon",
  couponSchema,
);

export default Coupon;
