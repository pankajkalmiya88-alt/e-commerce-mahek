import { BaseService } from "@/lib/base-service";
import { API_ENDPOINTS } from "@/lib/api-config";

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

export interface CartListResponse {
  items: CartItem[];
  total: number;
}

class CartService extends BaseService {
  private readonly CART_STORAGE_KEY = "mahek_cart";

  async addToCart(data: AddToCartRequest): Promise<void> {
    return this.post<void>(API_ENDPOINTS.CART.ADD, data);
  }

  async updateCart(data: UpdateCartRequest): Promise<void> {
    return this.post<void>(API_ENDPOINTS.CART.UPDATE, data);
  }

  async removeFromCart(data: RemoveFromCartRequest): Promise<void> {
    return this.post<void>(API_ENDPOINTS.CART.REMOVE, data);
  }

  async getCartList(): Promise<CartListResponse> {
    return this.get<CartListResponse>(API_ENDPOINTS.CART.LIST);
  }

  async clearCart(): Promise<void> {
    return this.delete<void>(API_ENDPOINTS.CART.CLEAR);
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
