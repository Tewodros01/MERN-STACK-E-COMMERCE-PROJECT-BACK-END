import mongoose, { Model, Schema, Document } from "mongoose";

interface IReview {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}

interface IReviewDocument extends Document, IReview {
  reviewId: string;
}

const reviewSchema = new Schema<IReviewDocument>(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
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

const ReviewModel: Model<IReviewDocument> = mongoose.model<IReviewDocument>(
  "Review",
  reviewSchema,
);

export { IReview, IReviewDocument, ReviewModel };
