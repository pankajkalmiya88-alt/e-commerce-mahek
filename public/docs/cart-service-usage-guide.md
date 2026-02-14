# Cart Service Usage Guide

## Overview

The cart service has been updated to support the new API payload structure that includes product variants and sizes.

## Updated Payload Structure

### AddToCartRequest Interface

```typescript
export interface AddToCartRequest {
  productId: string;
  variantId: string;
  size: string;
  quantity: number;
}
```

### Example Payload

```json
{
  "productId": "PRODUCT_ID",
  "variantId": "VARIANT_ID",
  "size": "FREE",
  "quantity": 1
}
```

## Usage Examples

### 1. Product Detail Page (with API Product Data)

When you have access to the full API product data with variants:

```typescript
import { cartService } from "@/features/cart/services/cart.service";
import { Product as APIProduct } from "@/features/products/types";

const handleAddToCart = async () => {
  const firstVariant = apiProduct?.variants[0];
  const firstSize = firstVariant?.sizes[0]?.size || "FREE";

  if (!firstVariant) {
    console.error("Product variant not available");
    return;
  }

  await cartService.addToCart({
    productId: product.id,
    variantId: firstVariant.variantId,
    size: firstSize,
    quantity: 1,
  });
};
```

### 2. Product Card (without API Product Data)

When you only have the UI product data:

```typescript
import { cartService } from "@/features/cart/services/cart.service";

const handleAddToCart = async () => {
  const defaultSize = product.sizes && product.sizes.length > 0 
    ? product.sizes[0].name 
    : "FREE";
  
  await cartService.addToCart({
    productId: product.id,
    variantId: `${product.id}_variant_1`, // Placeholder variant ID
    size: defaultSize,
    quantity: 1,
  });
};
```

### 3. With User-Selected Variant and Size

When implementing variant/size selection UI:

```typescript
import { cartService } from "@/features/cart/services/cart.service";

const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
const [selectedSize, setSelectedSize] = useState<string>("FREE");

const handleAddToCart = async () => {
  if (!selectedVariant) {
    alert("Please select a variant");
    return;
  }

  await cartService.addToCart({
    productId: product.id,
    variantId: selectedVariant.variantId,
    size: selectedSize,
    quantity: quantity,
  });
};
```

## API Product Structure

The API returns products with the following variant structure:

```typescript
interface ProductVariant {
  variantId: string;
  color: string;
  sellingPrice: number;
  mrp: number;
  sizes: ProductVariantSize[];
  images: string[];
  sizeDetails: string;
}

interface ProductVariantSize {
  size: string;
  stock: number;
}
```

## Implementation Notes

### Current Implementation

1. **ProductDetailClient** (`app/product/[id]/ProductDetailClient.tsx`)
   - Uses the first variant from `apiProduct.variants[0]`
   - Uses the first size from that variant
   - Falls back to "FREE" if no size is available

2. **ProductCard** (`src/components/product/ProductCard.tsx`)
   - Uses the first size from `product.sizes`
   - Falls back to "FREE" if no sizes are available
   - Uses a placeholder variantId: `${product.id}_variant_1`

### Future Enhancements

To implement proper variant and size selection:

1. **Add Variant Selection UI**
   - Color/variant selector component
   - Update selected variant state
   - Display variant-specific images and prices

2. **Add Size Selection UI**
   - Size selector component (buttons or dropdown)
   - Show available sizes for selected variant
   - Disable out-of-stock sizes

3. **Update Cart Service Calls**
   - Use user-selected variant and size
   - Validate selection before adding to cart
   - Show appropriate error messages

## Error Handling

Always wrap cart service calls in try-catch blocks:

```typescript
try {
  await cartService.addToCart({
    productId: product.id,
    variantId: selectedVariant.variantId,
    size: selectedSize,
    quantity: quantity,
  });
  
  // Success handling
  incrementCartCount();
  showSuccessMessage();
} catch (error) {
  console.error("Failed to add to cart:", error);
  showErrorMessage("Failed to add product to cart. Please try again.");
}
```

## Type Safety

All cart-related types are exported from the cart service:

```typescript
import { 
  cartService, 
  AddToCartRequest, 
  CartItem 
} from "@/features/cart/services/cart.service";
```

## Related Files

- **Service**: `src/features/cart/services/cart.service.ts`
- **Product Types**: `src/features/products/types/index.ts`
- **UI Product Types**: `src/types/product.ts`
- **Product Adapter**: `src/features/products/utils/product-adapter.ts`
