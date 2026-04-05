import { BaseService } from "@/lib/base-service";
import { API_ENDPOINTS } from "@/lib/api-config";
import type { AddReviewRequest, UpdateReviewRequest } from "../types";

class ReviewService extends BaseService {
  async addReview(productId: string, data: AddReviewRequest): Promise<void> {
    return this.post<void>(API_ENDPOINTS.REVIEWS.ADD(productId), data);
  }

  async updateReview(
    productId: string,
    reviewId: string,
    data: UpdateReviewRequest,
  ): Promise<void> {
    return this.put<void>(
      API_ENDPOINTS.REVIEWS.UPDATE(productId, reviewId),
      data,
    );
  }

  async deleteReview(productId: string, reviewId: string): Promise<void> {
    return this.delete<void>(API_ENDPOINTS.REVIEWS.DELETE(productId, reviewId));
  }
}

export const reviewService = new ReviewService();
