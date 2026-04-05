# Variant-Based Wishlist & Cart Implementation Guide

## Overview

The wishlist and cart systems have been updated to support **variant-based products** with specific `variantId` and `size` selections. This aligns with the API's product structure where each product has multiple variants (colors) and each variant has multiple sizes.

---

## API Product Structure

### Product Response Example

```json
{
  "_id": "698f58ac0208889992d95d5f",
  "name": "PURVAJA",
  "slug": "purvaja",
  "brand": "Tata",
  "category": "Lehenga",
  "avgPrice": 1249,
  "totalStock": 251,
  "allImages": ["..."],
  "allColors": ["red", "orange"],
  "allSizes": ["XS", "M", "S", "L", "XL"],
  "variants": [
    {
      "variantId": "699075a5d1a8f159c7b8cc2c",
      "color": "red",
      "sellingPrice": 499,
      "mrp": 599,
      "sizes": [
        { "size": "XS", "stock": 12 },
        { "size": "M", "stock": 6 }
      ],
      "images": ["..."]
    },
    {
      "variantId": "699075a5d1a8f159c7b8cc2d",
      "color": "orange",
      "sellingPrice": 1999,
      "mrp": 2500,
      "sizes": [
        { "size": "XS", "stock": 45 },
        { "size": "M", "stock": 5 },
        { "size": "S", "stock": 6 },
        { "size": "L", "stock": 77 },
        { "size": "XL", "stock": 100 }
      ],
      "images": ["..."]
    }
  ]
}
```

---

## Updated Type Definitions

### Wishlist Types

**File:** `src/features/wishlist/types/index.ts`

```typescript
// Add to Wishlist Request - NOW REQUIRES variantId and size
export interface AddToWishlistRequest {
  productId: string;
  variantId: string;  // ✅ NEW - Required
  size: string;       // ✅ NEW - Required
}

// Wishlist Item - NOW INCLUDES variant and size info
export interface WishlistItem {
  _id: string;
  product: WishlistProduct;
  variantId: string;  // ✅ NEW - Which color variant
  size: string;       // ✅ NEW - Which size
  addedAt: string;
}

// Wishlist Product - NOW MATCHES full API product structure
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
  variants: WishlistProductVariant[];  // ✅ NEW - Full variant data
  averageRating: number;
  totalReviews: number;
  reviews: any[];
  createdAt: string;
  updatedAt: string;
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

export interface WishlistProductVariantSize {
  size: string;
  stock: number;
}
```

### Cart Types

**File:** `src/features/cart/services/cart.service.ts`

```typescript
// Add to Cart Request - ALREADY HAS variantId and size
export interface AddToCartRequest {
  productId: string;
  variantId: string;
  size: string;
  quantity: number;
}

// Move to Cart from Wishlist - NOW REQUIRES variantId and size
export interface MoveToCartRequest {
  productId: string;
  variantId: string;  // ✅ NEW - Required
  size: string;       // ✅ NEW - Required
}
```

---

## Required Changes for UI Components

### ⚠️ CRITICAL: Components Must Collect Variant & Size Before Adding

**Components that need updates:**

1. **ProductCard** (`src/components/product/ProductCard.tsx`)
2. **ProductImageGallery** (`src/components/product/ProductImageGallery.tsx`)
3. **Product Detail Pages**
4. **Quick Add to Cart/Wishlist buttons**

### Implementation Pattern

#### ❌ OLD WAY (No longer works)

```typescript
// This will FAIL - missing variantId and size
await wishlistService.addToWishlist({ 
  productId: product.id 
});
```

#### ✅ NEW WAY (Required)

```typescript
// User must select variant (color) and size first
const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
const [selectedSize, setSelectedSize] = useState<string>("");

// Then add to wishlist with complete data
await wishlistService.addToWishlist({
  productId: product._id,
  variantId: selectedVariant.variantId,
  size: selectedSize
});
```

---

## UI/UX Recommendations

### Option 1: Disable Quick Add Until Selection Made

```typescript
<button
  onClick={handleAddToWishlist}
  disabled={!selectedVariant || !selectedSize}
  className="..."
>
  {!selectedVariant || !selectedSize 
    ? "Select Color & Size" 
    : "Add to Wishlist"}
</button>
```

### Option 2: Show Modal for Variant/Size Selection

```typescript
const handleQuickAdd = () => {
  if (!selectedVariant || !selectedSize) {
    // Show modal to select variant and size
    setShowVariantModal(true);
  } else {
    // Proceed with adding to wishlist
    addToWishlist();
  }
};
```

### Option 3: Redirect to Product Detail Page

```typescript
const handleAddToWishlist = () => {
  // If variant/size not selected, go to product page
  if (!selectedVariant || !selectedSize) {
    router.push(`/product/${product._id}`);
    return;
  }
  
  // Otherwise add directly
  await wishlistService.addToWishlist({
    productId: product._id,
    variantId: selectedVariant.variantId,
    size: selectedSize
  });
};
```

---

## Example: Product Detail Page Implementation

```typescript
"use client";

import { useState } from "react";
import { Product, ProductVariant } from "@/features/products/types";
import { wishlistService } from "@/features/wishlist/services/wishlist.service";
import { cartService } from "@/features/cart/services/cart.service";

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants[0] || null
  );
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleAddToWishlist = async () => {
    if (!selectedVariant || !selectedSize) {
      alert("Please select a color and size");
      return;
    }

    try {
      await wishlistService.addToWishlist({
        productId: product._id,
        variantId: selectedVariant.variantId,
        size: selectedSize,
      });
      // Show success message
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedSize) {
      alert("Please select a color and size");
      return;
    }

    try {
      await cartService.addToCart({
        productId: product._id,
        variantId: selectedVariant.variantId,
        size: selectedSize,
        quantity: 1,
      });
      // Show success message
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <div>
      {/* Color Selection */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Select Color</h3>
        <div className="flex gap-2">
          {product.variants.map((variant) => (
            <button
              key={variant.variantId}
              onClick={() => {
                setSelectedVariant(variant);
                setSelectedSize(""); // Reset size when color changes
              }}
              className={`px-4 py-2 border rounded ${
                selectedVariant?.variantId === variant.variantId
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300"
              }`}
            >
              {variant.color}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      {selectedVariant && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Select Size</h3>
          <div className="flex gap-2">
            {selectedVariant.sizes.map((sizeObj) => (
              <button
                key={sizeObj.size}
                onClick={() => setSelectedSize(sizeObj.size)}
                disabled={sizeObj.stock === 0}
                className={`px-4 py-2 border rounded ${
                  selectedSize === sizeObj.size
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300"
                } ${sizeObj.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {sizeObj.size}
                {sizeObj.stock === 0 && " (Out of Stock)"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToWishlist}
          disabled={!selectedVariant || !selectedSize}
          className="px-6 py-3 border border-primary text-primary rounded disabled:opacity-50"
        >
          Add to Wishlist
        </button>
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant || !selectedSize}
          className="px-6 py-3 bg-primary text-white rounded disabled:opacity-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

---

## Displaying Wishlist Items

When displaying wishlist items, you now have access to the specific variant and size:

```typescript
import { WishlistItem } from "@/features/wishlist/types";

export function WishlistItemCard({ item }: { item: WishlistItem }) {
  // Find the specific variant that was wishlisted
  const variant = item.product.variants.find(
    (v) => v.variantId === item.variantId
  );

  return (
    <div className="wishlist-item">
      <img src={variant?.images[0]} alt={item.product.name} />
      <h3>{item.product.name}</h3>
      <p>Color: {variant?.color}</p>
      <p>Size: {item.size}</p>
      <p>Price: ₹{variant?.sellingPrice}</p>
      {variant?.mrp && variant.mrp > variant.sellingPrice && (
        <p className="line-through">₹{variant.mrp}</p>
      )}
    </div>
  );
}
```

---

## Migration Checklist

- [ ] Update all "Add to Wishlist" buttons to require variant + size selection
- [ ] Update all "Add to Cart" buttons to require variant + size selection
- [ ] Add color/variant selector UI to product cards (or disable quick add)
- [ ] Add size selector UI to product cards (or disable quick add)
- [ ] Update ProductCard component to handle variant selection
- [ ] Update ProductImageGallery component to handle variant selection
- [ ] Update wishlist display components to show variant color and size
- [ ] Update cart display components to show variant color and size
- [ ] Test adding items with different variants and sizes
- [ ] Test moving items from wishlist to cart with correct variant/size

---

## API Payload Examples

### Add to Wishlist

```json
POST /api/wishlist/add
{
  "productId": "698f58ac0208889992d95d5f",
  "variantId": "699075a5d1a8f159c7b8cc2d",
  "size": "XS"
}
```

### Add to Cart

```json
POST /api/cart/add
{
  "productId": "698f58ac0208889992d95d5f",
  "variantId": "699075a5d1a8f159c7b8cc2d",
  "size": "XS",
  "quantity": 1
}
```

### Move to Cart from Wishlist

```json
POST /api/wishlist/move-to-cart
{
  "productId": "698f58ac0208889992d95d5f",
  "variantId": "699075a5d1a8f159c7b8cc2d",
  "size": "XS"
}
```

---

## Key Takeaways

1. **Never add to wishlist/cart without variant and size** - The API requires these fields
2. **Each variant has its own price** - Use `variant.sellingPrice`, not `product.avgPrice`
3. **Each variant has its own images** - Show `variant.images`, not `product.allImages`
4. **Size availability varies by variant** - Check `variant.sizes[].stock` for availability
5. **UI must collect user selection** - Add color/size selectors before allowing add actions

---

## Questions?

If you encounter issues:
1. Verify the product has variants with `product.variants.length > 0`
2. Ensure variant has the selected size in `variant.sizes[]`
3. Check that size has stock > 0 before allowing selection
4. Confirm all three fields (productId, variantId, size) are sent to API
