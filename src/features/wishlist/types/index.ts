export interface WishlistProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discountPercent: number;
  oldPrice?: number;
  images: string[];
  category: string;
  averageRating: number;
  totalReviews: number;
  stock: number;
  availability?: "IN_STOCK" | "OUT_OF_STOCK" | "PRE_ORDER";
}

export interface WishlistItem {
  _id: string;
  product: WishlistProduct;
  addedAt: string;
}

export interface WishlistResponse {
  items: WishlistItem[];
  total: number;
}

export interface AddToWishlistRequest {
  productId: string;
}

export interface MoveToCartRequest {
  productId: string;
}

export interface BulkMoveToCartRequest {
  productIds: string[];
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}
