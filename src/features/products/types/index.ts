export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discountPercent: number;
  oldPrice?: number;
  stock: number;
  sizes: string[];
  isActive: boolean;
  category: string;
  images: string[];
  colors: string[];
  description: string;
  averageRating: number;
  totalReviews: number;
  reviews: any[];
  createdAt: string;
  updatedAt: string;
  availability?: "IN_STOCK" | "OUT_OF_STOCK" | "PRE_ORDER";
  isFeatured?: boolean;
  discountLabel?: string;
  features?: string[];
  washingInstructions?: string[];
  disclaimer?: string;
}

export interface ProductsListResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  products: Product[];
}

export interface ProductsListParams {
  type?: string;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price-low" | "price-high" | "newest" | "popular" | "rating";
  color?: string;
  size?: string;
  availability?: "IN_STOCK" | "OUT_OF_STOCK" | "PRE_ORDER";
  page?: number;
}

export type ProductCategory =
  | "SAREE"
  | "BANARASI_SAREE"
  | "LEHENGA"
  | "BRIDAL_LEHENGA"
  | "RAJPUTI_POSHAK";

export const CATEGORY_TYPE_MAP: Record<string, ProductCategory> = {
  sarees: "SAREE",
  "banarasi-sarees": "BANARASI_SAREE",
  lehenga: "LEHENGA",
  "bridal-lehenga": "BRIDAL_LEHENGA",
  "rajputi-poshak": "RAJPUTI_POSHAK",
};
