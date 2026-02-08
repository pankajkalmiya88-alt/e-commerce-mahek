---
description: Next.js Dynamic Routing and API Integration Best Practices
---

# Next.js Dynamic Routing and API Integration Rules

## Critical Rules - MUST FOLLOW

### 1. Static Export vs Dynamic Routing

**RULE:** Never use `output: "export"` in `next.config.ts` when working with dynamic API-based routes.

**Why:**
- Static export requires all dynamic routes to have params generated at build time
- API-based applications need runtime data fetching
- Causes error: "Page is missing param in generateStaticParams()"

**Correct Configuration:**
```typescript
// ✅ CORRECT - For API-based applications
const nextConfig = {
  images: {
    unoptimized: true,
  },
};
```

**Incorrect Configuration:**
```typescript
// ❌ WRONG - Don't use with dynamic API routes
const nextConfig = {
  output: "export", // This breaks dynamic routing
  images: {
    unoptimized: true,
  },
};
```

### 2. Dynamic Route Naming Consistency

**RULE:** Use consistent parameter names across all dynamic routes. Never mix different param names for the same route.

**Why:**
- Next.js throws error: "You cannot use different slug names for the same dynamic path"
- Causes build failures and routing conflicts

**Correct Structure:**
```
app/
  product/
    [id]/          ✅ Use ONLY [id]
      page.tsx
```

**Incorrect Structure:**
```
app/
  product/
    [id]/          ❌ Don't mix [id] and [slug]
      page.tsx
    [slug]/        ❌ This causes conflict
      page.tsx
```

### 3. generateStaticParams() Implementation

**RULE:** When using dynamic API routes, `generateStaticParams()` should return an empty array.

**Implementation:**
```typescript
// ✅ CORRECT - For dynamic API routes
export async function generateStaticParams() {
  return [];
}
```

**Don't Do:**
```typescript
// ❌ WRONG - Don't try to fetch all products at build time
export async function generateStaticParams() {
  const products = await fetchAllProducts(); // This won't work with dynamic data
  return products.map(p => ({ id: p.id }));
}
```

### 4. Route Parameter Usage

**RULE:** Use `_id` from API responses for navigation, not `slug`.

**Why:**
- API identifies products by `_id`
- Ensures consistent data fetching
- Prevents 404 errors

**Correct Implementation:**
```typescript
// ✅ CORRECT - Use product ID for navigation
const productUrl = ROUTES.PRODUCT_DETAIL(product.id);

// In ROUTES constant
PRODUCT_DETAIL: (id: string) => `/product/${id}`

// In page.tsx
interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const { id } = await params;
const product = await productService.getProductById(id);
```

**Incorrect Implementation:**
```typescript
// ❌ WRONG - Don't use slug when API uses _id
const productUrl = ROUTES.PRODUCT_DETAIL(product.slug);
```

### 5. API Service Methods

**RULE:** Always implement both `getProductById()` and `getProductBySlug()` methods in services.

**Implementation:**
```typescript
class ProductService {
  // ✅ Primary method - Use for detail pages
  async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get<Product>(`${BASE_URL}/products/${id}`);
    return response;
  }

  // ✅ Secondary method - Keep for flexibility
  async getProductBySlug(slug: string): Promise<Product> {
    const response = await apiClient.get<Product>(`${BASE_URL}/products/${slug}`);
    return response;
  }
}
```

### 6. Product Adapter Pattern

**RULE:** Always use adapter pattern to transform API products to UI products.

**Why:**
- API uses `_id`, UI uses `id`
- Different field structures between API and UI
- Ensures type safety

**Implementation:**
```typescript
// ✅ CORRECT - Always adapt API products
export function adaptAPIProductToUI(apiProduct: APIProduct): UIProduct {
  return {
    id: apiProduct._id,  // Map _id to id
    name: apiProduct.name,
    slug: apiProduct.slug,
    // ... other mappings
  };
}

// Usage in components
const uiProduct = adaptAPIProductToUI(apiProduct);
<ProductCard product={uiProduct} />
```

### 7. Component File Organization

**RULE:** Keep related components in the same directory as the page that uses them.

**Structure:**
```
app/
  product/
    [id]/
      page.tsx                    ✅ Main page
      ProductDetailClient.tsx     ✅ Client component
      ProductTabs.tsx            ✅ Related component
```

**Don't Do:**
```
app/
  product/
    [id]/
      page.tsx                    ❌ Missing components
  components/
    ProductDetailClient.tsx       ❌ Too far from usage
```

### 8. Module Imports

**RULE:** Use relative imports for components in the same directory.

**Correct:**
```typescript
// ✅ CORRECT
import { ProductDetailClient } from "./ProductDetailClient";
import { ProductTabs } from "./ProductTabs";
```

**Incorrect:**
```typescript
// ❌ WRONG
import { ProductDetailClient } from "@/components/ProductDetailClient";
```

### 9. Cache Clearing

**RULE:** Always clear `.next` cache when changing route structure or configuration.

**Command:**
```bash
# Windows PowerShell
Remove-Item -Path ".next" -Recurse -Force

# Then restart dev server
npm run dev
```

### 10. Type Safety

**RULE:** Always define proper TypeScript interfaces for route params.

**Implementation:**
```typescript
// ✅ CORRECT
interface ProductDetailPageProps {
  params: Promise<{
    id: string;  // Must match folder name [id]
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  // Use id...
}
```

## Common Errors and Solutions

### Error 1: "You cannot use different slug names for the same dynamic path"

**Solution:**
1. Check for multiple dynamic route folders (e.g., `[id]` and `[slug]`)
2. Remove conflicting folders
3. Keep only one dynamic route folder
4. Clear `.next` cache
5. Restart dev server

### Error 2: "Page is missing param in generateStaticParams()"

**Solution:**
1. Remove `output: "export"` from `next.config.ts`
2. Keep `generateStaticParams()` returning empty array
3. Restart dev server

### Error 3: "Module not found: Can't resolve './ComponentName'"

**Solution:**
1. Verify component file exists in the same directory
2. Check file name casing matches import
3. Ensure file has proper export
4. Clear `.next` cache
5. Restart dev server

### Error 4: "Cannot read properties of undefined (reading '_id')"

**Solution:**
1. Ensure API response is properly handled
2. Add null checks in adapter
3. Provide default values for optional fields
4. Use optional chaining: `product?._id`

## Checklist for New Dynamic Routes

- [ ] Remove `output: "export"` from `next.config.ts`
- [ ] Use consistent param names (prefer `[id]` over `[slug]`)
- [ ] Implement `generateStaticParams()` returning `[]`
- [ ] Create service method for fetching by ID
- [ ] Create adapter to transform API data to UI data
- [ ] Use relative imports for local components
- [ ] Define proper TypeScript interfaces
- [ ] Test with actual API data
- [ ] Clear cache before testing
- [ ] Verify no duplicate dynamic folders exist

## Best Practices Summary

1. **Configuration:** No static export for API-based apps
2. **Routing:** Use `[id]` for product routes
3. **Data Fetching:** Fetch at runtime, not build time
4. **Type Safety:** Always define proper interfaces
5. **Adapters:** Transform API data to UI format
6. **Organization:** Keep related files together
7. **Imports:** Use relative paths for local components
8. **Testing:** Clear cache when changing structure
9. **Consistency:** Use same param names across routes
10. **Error Handling:** Add null checks and fallbacks

## When to Use What

### Use `output: "export"` when:
- Building a completely static site
- No dynamic API calls
- All data known at build time
- Deploying to static hosting (GitHub Pages, etc.)

### Don't use `output: "export"` when:
- Fetching data from external APIs ✅ (Our case)
- Using dynamic routes with runtime data ✅ (Our case)
- Need server-side rendering
- Need API routes

## Migration Guide

If you accidentally enabled static export:

1. **Remove static export:**
   ```typescript
   // next.config.ts
   const nextConfig = {
     // output: "export", ❌ Remove this line
     images: { unoptimized: true },
   };
   ```

2. **Clear cache:**
   ```bash
   Remove-Item -Path ".next" -Recurse -Force
   ```

3. **Restart server:**
   ```bash
   npm run dev
   ```

4. **Verify routes work:**
   - Test category pages
   - Test product detail pages
   - Check API calls in Network tab

---

**Last Updated:** 2026-02-08
**Applies To:** Next.js 16.x with TypeScript and API integration
