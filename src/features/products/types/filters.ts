export enum SortOption {
  RECOMMENDED = "recommended",
  WHATS_NEW = "whats-new",
  POPULARITY = "popularity",
  BETTER_DISCOUNT = "better-discount",
  PRICE_HIGH_TO_LOW = "price-high-to-low",
  PRICE_LOW_TO_HIGH = "price-low-to-high",
  CUSTOMER_RATING = "customer-rating",
}

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  colors: string[];
  sizes: string[];
  bundles: string[];
  countryOfOrigin: string[];
  sortBy: SortOption;
}

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface SizeOption {
  id: string;
  label: string;
}
