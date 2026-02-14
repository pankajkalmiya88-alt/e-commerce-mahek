import apiClient from "@/lib/api-client";
import type { AddReviewRequest, UpdateReviewRequest } from "../types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api-dev.maheksarees.in/api/";

class ReviewService {
  async addReview(productId: string, data: AddReviewRequest): Promise<void> {
    try {
      await apiClient.post(`${BASE_URL}products/${productId}/reviews`, data);
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  }

  async updateReview(
    productId: string,
    reviewId: string,
    data: UpdateReviewRequest,
  ): Promise<void> {
    try {
      await apiClient.put(
        `${BASE_URL}products/${productId}/reviews/${reviewId}`,
        data,
      );
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  }

  async deleteReview(productId: string, reviewId: string): Promise<void> {
    try {
      await apiClient.delete(
        `${BASE_URL}products/${productId}/reviews/${reviewId}`,
      );
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  }
}

export const reviewService = new ReviewService();
