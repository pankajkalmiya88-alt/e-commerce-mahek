import apiClient from "@/lib/api-client";

const BASE_URL = "https://mahek-saree-develop.onrender.com/api";

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface CartCountResponse {
  count: number;
}

class CartService {
  async addToCart(data: AddToCartRequest): Promise<void> {
    try {
      await apiClient.post(`${BASE_URL}/cart/add-to-cart`, data);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }

  async getCartCount(): Promise<number> {
    try {
      const response = await apiClient.get<CartCountResponse>(
        `${BASE_URL}/cart/count`,
      );
      return response.count;
    } catch (error) {
      console.error("Error fetching cart count:", error);
      return 0;
    }
  }
}

export const cartService = new CartService();
