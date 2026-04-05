import type { Product as APIProduct, ProductVariant } from "../types";

export interface ExpandedVariantProduct extends APIProduct {
  selectedVariantId: string;
  selectedVariant: ProductVariant;
}

/**
 * Expands a product into multiple products, one per variant
 * Each expanded product represents a specific color variant
 */
export function expandProductVariants(
  apiProduct: APIProduct,
): ExpandedVariantProduct[] {
  if (!apiProduct.variants || apiProduct.variants.length === 0) {
    return [];
  }

  return apiProduct.variants.map((variant) => {
    // Filter out null/undefined sizes
    const validSizes = (variant.sizes || []).filter(
      (s) => s !== null && s !== undefined && s.size,
    );

    // If no valid sizes, create a default ONE_SIZE entry
    const sizes =
      validSizes.length > 0 ? validSizes : [{ size: "ONE_SIZE", stock: 0 }];

    return {
      ...apiProduct,
      selectedVariantId: variant.variantId,
      selectedVariant: {
        ...variant,
        sizes: sizes,
      },
      // Override aggregated data with variant-specific data
      allImages: variant.images || [],
      allColors: [variant.color],
      allSizes: sizes.map((s) => s.size),
      avgPrice: variant.sellingPrice,
      totalStock: sizes.reduce((sum, s) => sum + (s.stock || 0), 0),
    };
  });
}
