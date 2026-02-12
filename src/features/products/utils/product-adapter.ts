import type { Product as APIProduct } from "../types";
import type { Product as UIProduct } from "@/types/product";
import { ProductLabelType, StockStatus } from "@/types/product";

export function adaptAPIProductToUI(apiProduct: APIProduct): UIProduct {
  const hasDiscount =
    apiProduct.discountPercent && apiProduct.discountPercent > 0;

  return {
    id: apiProduct._id,
    name: apiProduct.name,
    slug: apiProduct.slug,
    description: apiProduct.description,
    shortDescription: apiProduct.description?.substring(0, 150),
    images: (apiProduct.images || []).map((url) => ({
      url: url,
      alt: apiProduct.name,
    })),
    price: {
      current: apiProduct.price,
      original: apiProduct.oldPrice,
      discount: apiProduct.discountPercent,
    },
    rating: {
      average: apiProduct.averageRating || 0,
      count: apiProduct.totalReviews || 0,
    },
    category: apiProduct.category,
    categorySlug: apiProduct.category.toLowerCase().replace(/_/g, "-"),
    stockStatus:
      apiProduct.availability === "IN_STOCK"
        ? StockStatus.IN_STOCK
        : apiProduct.availability === "OUT_OF_STOCK"
          ? StockStatus.OUT_OF_STOCK
          : StockStatus.PRE_ORDER,
    featured: apiProduct.isFeatured || false,
    bestseller: apiProduct.isFeatured || false,
    trending: apiProduct.isFeatured || false,
    colors:
      apiProduct.colors?.map((color) => ({
        name: color,
        image: "",
        available: true,
      })) || [],
    sizes:
      apiProduct.sizes?.map((size) => ({
        name: size,
        available: true,
      })) || [],
    features: apiProduct.features || [],
    fabric: "Viscose",
    sku: apiProduct._id.substring(0, 8).toUpperCase(),
    label: hasDiscount
      ? {
          type: ProductLabelType.SALE,
          text: `${apiProduct.discountPercent}% OFF`,
        }
      : apiProduct.availability === "PRE_ORDER"
        ? {
            type: ProductLabelType.PRE_ORDER,
            text: "PRE ORDER",
          }
        : undefined,
    washingInstructions: {
      disclaimer: apiProduct.disclaimer,
    },
  };
}
