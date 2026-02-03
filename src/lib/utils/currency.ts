import { SITE_CONFIG } from "@/constants/site";

export const formatPrice = (price: number): string => {
  return `${SITE_CONFIG.currencySymbol} ${price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const calculateDiscount = (
  originalPrice: number,
  currentPrice: number
): number => {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const formatDiscount = (discount: number): string => {
  return `-${discount}%`;
};
