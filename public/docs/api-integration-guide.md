# API Integration Guide - Product Listing with Filters

## Overview

This guide documents the integration of the Mahek Sarees product API with comprehensive filter support for category pages.

## API Endpoint

**Base URL:** `https://mahek-saree-develop.onrender.com/api`

**Endpoint:** `/products/list`

**Method:** GET

## Supported Query Parameters

| Parameter | Type | Description | Example Values |
|-----------|------|-------------|----------------|
| `type` | string | Product category type | `SAREE`, `BANARASI_SAREE`, `LEHENGA`, `BRIDAL_LEHENGA`, `RAJPUTI_POSHAK` |
| `limit` | number | Number of products per page | `10`, `20`, `50` |
| `minPrice` | number | Minimum price filter | `1000`, `3000` |
| `maxPrice` | number | Maximum price filter | `5000`, `10000` |
| `sort` | string | Sort order | `price-low`, `price-high`, `newest`, `popular`, `rating` |
| `color` | string | Filter by color | `red`, `blue`, `gold` |
| `size` | string | Filter by size | `S`, `M`, `L`, `XL`, `Free Size` |
| `availability` | string | Stock availability | `IN_STOCK`, `OUT_OF_STOCK`, `PRE_ORDER` |
| `page` | number | Page number for pagination | `1`, `2`, `3` |

## API Response Structure

```typescript
{
  total: number;           // Total number of products matching filters
  page: number;            // Current page number
  limit: number;           // Products per page
  totalPages: number;      // Total number of pages
  products: Product[];     // Array of product objects
}
```

## Product Object Structure

```typescript
{
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
}
```

## Category Slug to Type Mapping

| Route Slug | API Type |
|------------|----------|
| `sarees` | `SAREE` |
| `banarasi-sarees` | `BANARASI_SAREE` |
| `lehenga` | `LEHENGA` |
| `bridal-lehenga` | `BRIDAL_LEHENGA` |
| `rajputi-poshak` | `RAJPUTI_POSHAK` |

## Example API Calls

### Basic Category Listing
```
GET /api/products/list?type=LEHENGA&limit=10&page=1
```

### With Price Filter
```
GET /api/products/list?type=SAREE&minPrice=3000&maxPrice=8000&limit=10
```

### With Multiple Filters
```
GET /api/products/list?type=LEHENGA&minPrice=3000&maxPrice=8000&sort=price-low&color=red&size=M&availability=IN_STOCK&page=1
```

### Sorted by Price (Low to High)
```
GET /api/products/list?type=BANARASI_SAREE&sort=price-low&limit=20
```

## Implementation Files

### 1. Product Types
**File:** `src/features/products/types/index.ts`

Defines TypeScript interfaces for:
- Product
- ProductsListResponse
- ProductsListParams
- ProductCategory
- CATEGORY_TYPE_MAP

### 2. Product Service
**File:** `src/features/products/services/product.service.ts`

**Methods:**
- `getProductsList(params)` - Fetch products with filters
- `getProductBySlug(slug)` - Fetch single product by slug

**Features:**
- Automatic Bearer token injection via API client
- Query parameter building
- Error handling

### 3. Product Filters Component
**File:** `src/features/products/components/ProductFilters.tsx`

**Features:**
- Sort dropdown (Recommended, What's New, Popularity, Price, Rating)
- Price range filter with quick select buttons
- Color filter (dynamic based on available colors)
- Size filter (dynamic based on available sizes)
- Availability filter (In Stock, Out of Stock, Pre Order)
- Clear all filters button

### 4. Category Page
**File:** `app/category/[slug]/page.tsx`

**Features:**
- Dynamic category routing
- Real-time filter updates
- Product grid display
- Pagination
- Loading states
- Empty states
- Responsive design

## Usage Example

```typescript
import { productService } from "@/features/products/services/product.service";

// Fetch products with filters
const response = await productService.getProductsList({
  type: "LEHENGA",
  minPrice: 3000,
  maxPrice: 8000,
  sort: "price-low",
  color: "red",
  size: "M",
  availability: "IN_STOCK",
  limit: 10,
  page: 1,
});

console.log(response.products); // Array of products
console.log(response.total);    // Total count
```

## Filter Behavior

### Price Range
- Users can enter custom min/max prices
- Quick select buttons for common ranges:
  - Under ₹1000
  - ₹1000-₹3000
  - ₹3000-₹5000
  - ₹5000-₹10000
  - Above ₹10000

### Sort Options
- **Recommended** - Default sorting
- **What's New** - `sort=newest`
- **Popularity** - `sort=popular`
- **Price: Low to High** - `sort=price-low`
- **Price: High to Low** - `sort=price-high`
- **Customer Rating** - `sort=rating`

### Color & Size Filters
- Dynamically populated from available products
- Single selection (radio behavior)
- Click again to deselect

### Availability Filter
- Radio button selection
- Options: In Stock, Out of Stock, Pre Order
- Click again to deselect

## Pagination

- Displays current page and total pages
- Previous/Next buttons
- Automatically disabled when at boundaries
- Resets to page 1 when filters change

## Authentication

The API client automatically includes the Bearer token from localStorage if the user is authenticated. No additional configuration needed.

## Error Handling

- Network errors are logged to console
- Loading states shown during fetch
- Empty states shown when no products match filters
- 401 errors automatically redirect to login (handled by API client)

## Performance Considerations

- Filters trigger immediate API calls
- Loading spinner shown during fetch
- Products are not cached (always fresh data)
- Sticky sidebar for easy filter access while scrolling

## Future Enhancements

- Add search functionality
- Implement filter combinations validation
- Add "Apply Filters" button to batch filter changes
- Cache filter state in URL query parameters
- Add filter count badges
- Implement infinite scroll as alternative to pagination
- Add product comparison feature
- Implement wishlist integration
