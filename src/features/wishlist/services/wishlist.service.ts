import apiClient from "@/lib/api-client";
import type {
  WishlistResponse,
  AddToWishlistRequest,
  MoveToCartRequest,
  BulkMoveToCartRequest,
  AddToCartRequest,
} from "../types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://maheksaree-production.up.railway.app/api";

class WishlistService {
  async getWishlist(): Promise<WishlistResponse> {
    try {
      const response = await apiClient.get<WishlistResponse>(
        `${BASE_URL}/wishlist/list`,
      );
      return response;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      throw error;
    }
  }

  async addToWishlist(data: AddToWishlistRequest): Promise<void> {
    try {
      await apiClient.post(`${BASE_URL}/wishlist/add`, data);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw error;
    }
  }

  async removeFromWishlist(productId: string): Promise<void> {
    try {
      await apiClient.delete(`${BASE_URL}/wishlist/remove/${productId}`);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }
  }

  async moveToCart(data: MoveToCartRequest): Promise<void> {
    try {
      await apiClient.post(`${BASE_URL}/wishlist/move-to-cart`, data);
    } catch (error) {
      console.error("Error moving to cart:", error);
      throw error;
    }
  }

  async bulkMoveToCart(data: BulkMoveToCartRequest): Promise<void> {
    try {
      await apiClient.post(`${BASE_URL}/wishlist/bulk-move-to-cart`, data);
    } catch (error) {
      console.error("Error bulk moving to cart:", error);
      throw error;
    }
  }

  async addToCart(data: AddToCartRequest): Promise<void> {
    try {
      await apiClient.post(`${BASE_URL}/cart/add-to-cart`, data);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }

  async getWishlistCount(): Promise<number> {
    try {
      const response = await this.getWishlist();
      return response.total;
    } catch (error) {
      console.error("Error fetching wishlist count:", error);
      return 0;
    }
  }
}

export const wishlistService = new WishlistService();
