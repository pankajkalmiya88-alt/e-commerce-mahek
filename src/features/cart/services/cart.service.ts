import apiClient from "@/lib/api-client";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api-dev.maheksarees.in/api/";

export interface AddToCartRequest {
  productId: string;
  variantId: string;
  size: string;
  quantity: number;
}

export interface UpdateCartRequest {
  productId: string;
  variantId: string;
  size: string;
  quantity: number;
}

export interface RemoveFromCartRequest {
  productId: string;
  variantId: string;
  size: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  size: string;
  quantity: number;
}

class CartService {
  private readonly CART_STORAGE_KEY = "mahek_cart";

  async addToCart(data: AddToCartRequest): Promise<void> {
    try {
      await apiClient.post(`${BASE_URL}cart/add`, data);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }

  async updateCart(data: UpdateCartRequest): Promise<void> {
    try {
      await apiClient.post(`${BASE_URL}cart/update`, data);
    } catch (error) {
      console.error("Error updating cart:", error);
      throw error;
    }
  }

  async removeFromCart(data: RemoveFromCartRequest): Promise<void> {
    try {
      await apiClient.post(`${BASE_URL}cart/remove`, data);
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  }

  getCartCount(): number {
    try {
      if (typeof window === "undefined") return 0;

      const cartData = localStorage.getItem(this.CART_STORAGE_KEY);
      if (!cartData) return 0;

      const cart: CartItem[] = JSON.parse(cartData);
      return cart.reduce((total, item) => total + item.quantity, 0);
    } catch (error) {
      console.error("Error calculating cart count:", error);
      return 0;
    }
  }
}

export const cartService = new CartService();
