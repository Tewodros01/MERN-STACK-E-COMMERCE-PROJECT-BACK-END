import {
  IReviewProduct,
  IReviewProductDocument,
  reviewProductModel,
} from "../models/review.product.model";

const reviewProductService = {
  createReview: async (
    productReview: IReviewProduct,
  ): Promise<IReviewProductDocument> => {
    try {
      const newReview = new reviewProductModel(productReview);

      return await newReview.save();
    } catch (error) {
      throw error;
    }
  },

  getReviewsByProduct: async (
    productId: string,
  ): Promise<IReviewProductDocument[]> => {
    try {
      return await reviewProductModel
        .find({ product: productId })
        .populate("user")
        .lean()
        .exec();
    } catch (error) {
      throw error;
    }
  },

  updateReview: async (
    productReview: IReviewProduct,
    productReviewId: string,
  ): Promise<IReviewProductDocument | null> => {
    try {
      const updatedReview = await reviewProductModel
        .findByIdAndUpdate(
          productReviewId,
          { rating: productReview.rating, comment: productReview.comment },
          { new: true },
        )
        .exec();

      if (!updatedReview) {
        return null;
      }

      return updatedReview;
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  },

  deleteReview: async (reviewId: string): Promise<boolean> => {
    try {
      const result = await reviewProductModel
        .findByIdAndDelete(reviewId)
        .exec();
      return !!result;
    } catch (error) {
      throw error;
    }
  },
};

export default reviewProductService;
