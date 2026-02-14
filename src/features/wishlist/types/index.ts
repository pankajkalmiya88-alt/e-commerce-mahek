export interface WishlistProductVariantSize {
  size: string;
  stock: number;
}

export interface WishlistProductVariant {
  variantId: string;
  color: string;
  sellingPrice: number;
  mrp: number;
  sizes: WishlistProductVariantSize[];
  images: string[];
  sizeDetails: string;
}

export interface WishlistProduct {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subCategory: string;
  pattern: string;
  sleeveType: string;
  fabric: string;
  neckType: string;
  description: string;
  isActive: boolean;
  isFeatured: boolean;
  avgPrice: number;
  totalStock: number;
  allImages: string[];
  allColors: string[];
  allSizes: string[];
  variants: WishlistProductVariant[];
  averageRating: number;
  totalReviews: number;
  reviews: any[];
  createdAt: string;
  updatedAt: string;
  price: number;
  oldPrice?: number;
  discountPercent: number;
  availability: "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK";
  images: string[];
}

export interface WishlistItem {
  _id: string;
  product: WishlistProduct;
  variantId: string;
  size: string;
  addedAt: string;
}

export interface WishlistResponse {
  items: WishlistItem[];
  total: number;
}

export interface AddToWishlistRequest {
  productId: string;
  variantId: string;
  size: string;
}

export interface MoveToCartRequest {
  productId: string;
  variantId: string;
  size: string;
}

export interface BulkMoveToCartItem {
  productId: string;
  variantId: string;
  size: string;
}

export type BulkMoveToCartRequest = BulkMoveToCartItem[];

export interface AddToCartRequest {
  productId: string;
  variantId: string;
  size: string;
  quantity: number;
}
