import { Request, Response } from "express";
import reviewProductService from "../services/review.product.service";
import { IReviewProduct } from "../models/review.product.model";

const reviewProductController = {
  createReview: async (req: Request, res: Response): Promise<void> => {
    try {
      const reviewProduct: IReviewProduct = {
        user: req.body.user,
        product: req.body.product,
        rating: req.body.rating,
        comment: req.body.comment,
      };
      const newReview = await reviewProductService.createReview(reviewProduct);
      res.status(201).json({ message: "success", data: newReview });
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getReviewsByProduct: async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = req.params.productId as string;
      const reviews = await reviewProductService.getReviewsByProduct(productId);
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error getting reviews by product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateReview: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateReviewProduct: IReviewProduct = {
        user: req.body.user,
        product: req.body.product,
        rating: req.body.rating,
        comment: req.body.comment,
      };

      const updatedReview = await reviewProductService.updateReview(
        updateReviewProduct,
        id,
      );
      if (updatedReview) {
        res.status(200).json({ message: "success", data: updatedReview });
      } else {
        res.status(404).json({ error: "Review not found" });
      }
    } catch (error) {
      console.error("Error updating review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteReview: async (req: Request, res: Response): Promise<void> => {
    try {
      const reviewId = req.params.reviewId as string;
      const deleted = await reviewProductService.deleteReview(reviewId);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Review not found" });
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default reviewProductController;
