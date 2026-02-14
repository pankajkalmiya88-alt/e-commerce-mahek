import type { Product as UIProduct } from "@/types/product";
import { ProductLabelType, StockStatus } from "@/types/product";
import type { ExpandedVariantProduct } from "./variant-expander";

/**
 * Adapts an expanded variant product to UI Product format
 * Each variant is treated as a separate product with specific color, price, and images
 */
export function adaptExpandedVariantToUI(
  expandedProduct: ExpandedVariantProduct,
): UIProduct {
  const variant = expandedProduct.selectedVariant;
  const discount =
    variant.mrp > variant.sellingPrice
      ? Math.round(((variant.mrp - variant.sellingPrice) / variant.mrp) * 100)
      : 0;
  const hasDiscount = discount > 0;
  const totalStock = (variant.sizes || []).reduce(
    (sum, s) => sum + (s?.stock || 0),
    0,
  );
  const stockStatus =
    totalStock > 0 ? StockStatus.IN_STOCK : StockStatus.OUT_OF_STOCK;

  const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "").substring(0, 150);
  };

  // Capitalize first letter of color
  const colorName = variant.color
    ? variant.color.charAt(0).toUpperCase() + variant.color.slice(1)
    : "Unknown";

  // Handle empty or missing images
  const variantImages =
    (variant.images || []).length > 0
      ? variant.images
      : expandedProduct.allImages || [];

  return {
    id: expandedProduct._id,
    name: `${expandedProduct.name} (${colorName})`, // Include color in name
    slug: expandedProduct.slug,
    description: expandedProduct.description || "",
    shortDescription: stripHtml(expandedProduct.description || ""),
    images: variantImages.map((url) => ({
      url: url,
      alt: `${expandedProduct.name} - ${colorName}`,
    })),
    price: {
      current: variant.sellingPrice,
      original: variant.mrp > variant.sellingPrice ? variant.mrp : undefined,
      discount: hasDiscount ? discount : undefined,
    },
    rating: {
      average: expandedProduct.averageRating || 0,
      count: expandedProduct.totalReviews || 0,
    },
    category: expandedProduct.category,
    categorySlug: expandedProduct.category.toLowerCase().replace(/_/g, "-"),
    stockStatus,
    featured: expandedProduct.isFeatured || false,
    bestseller: expandedProduct.isFeatured || false,
    trending: expandedProduct.isFeatured || false,
    colors: [
      {
        name: variant.color,
        image: variant.images[0] || "",
        available: totalStock > 0,
      },
    ],
    sizes: variant.sizes.map((size) => ({
      name: size.size,
      available: size.stock > 0,
    })),
    features: [],
    fabric: expandedProduct.fabric || "Viscose",
    sku: expandedProduct._id.substring(0, 8).toUpperCase(),
    label: hasDiscount
      ? {
          type: ProductLabelType.SALE,
          text: `${discount}% OFF`,
        }
      : stockStatus === StockStatus.OUT_OF_STOCK
        ? {
            type: ProductLabelType.SOLD_OUT,
            text: "SOLD OUT",
          }
        : undefined,
    washingInstructions: {},
  };
}
