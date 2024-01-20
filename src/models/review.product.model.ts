import mongoose, { Model, Schema, Types } from "mongoose";

interface IReviewProduct {
  user: Types.ObjectId;
  product: Types.ObjectId;
  rating: number;
  comment: string;
}

interface IReviewProductDocument extends Document {
  reviewId: string;
}

const reviewProductSchema: Schema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.reviewId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const reviewProductModel: Model<IReviewProductDocument> =
  mongoose.model<IReviewProductDocument>("ReviewProduct", reviewProductSchema);

export { reviewProductModel, IReviewProductDocument, IReviewProduct };
