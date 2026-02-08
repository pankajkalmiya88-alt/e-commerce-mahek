---
trigger: always_on
---

# Project Role

You are an expert in Next.js 16 and UI/UX, TypeScript, scalable frontend architecture, Tailwind CSS, SEO, and production-grade E-commerce systems.

Your goal is to build a **high-performance, SEO-optimized, maintainable E-commerce application** with strict engineering discipline.

---

# Tech Stack Rules

- Use **Next.js 16 App Router only**
- Use **TypeScript only** (.ts, .tsx)
- JavaScript (.js, .jsx) is **NOT allowed**
- No unnecessary dependencies — minimal, production-grade only

---

# Styling Rules (Strict)

- Use **Tailwind CSS ONLY**
- No custom CSS files
- No SCSS
- No CSS Modules
- No inline styles
- Use **Tailwind utility classes + reusable Tailwind components**
- Design must follow **global Tailwind theme tokens**
- No duplicated Tailwind class logic — extract reusable UI blocks

---

# Design System & Global Tokens

All design values must come from **a single source of truth**:

### Colors

### Typography (font family, font sizes)

**Font Pairing (Luxury + Modern):**

- **Headings:** Playfair Display (serif) - luxury, bridal, editorial vibe
- **Body/UI:** Poppins (sans-serif) - clean, modern, readable for pricing & buttons

**Usage:**

```tsx
// Headings: h1, h2, h3, h4, h5, h6
className = "font-playfair";

// Body text, buttons, UI elements
className = "font-poppins";
```

**Import from:** `@/lib/fonts` (next/font/google)

### Spacing (padding, margin)

### Radius

### Shadows

### Z-index scale

Rules:

- No hardcoded values in components
- All colors & spacing must map to Tailwind theme config
- Any visual change must require editing **only Tailwind config or tokens**
- Always use `font-playfair` for headings and `font-inter` for body/UI text

---

# DRY Principle (Mandatory)

Avoid repeating:

- HTML structure
- Tailwind class blocks
- Business logic
- API models
- Payload shapes
- Strings / Labels / Messages

Extract into:

- Shared components
- Constants
- Enums
- Types
- Utility helpers

---

# TypeScript Rules (Strict)

- No `any`
- Use:
  - `enum` → for fixed values
  - `type` → for API shapes
  - `interface` → for reusable contracts
  - `const` → for static values
- All API models must have typed schemas
- API payloads must be reusable typed models

---

# Component Architecture Rules

- Every **small UI unit = reusable component**
- Follow **feature-based architecture**

src/features/product/
src/features/cart/
src/features/auth/
src/features/checkout/

Each feature contains:

- components/
- hooks/
- services/
- types/
- constants/

---

# SEO Rules (E-commerce Mandatory)

- Server-side rendering (SSR) where needed
- Dynamic metadata using `generateMetadata`
- Semantic HTML tags only
- Schema.org structured data for:
  - Products
  - Reviews
  - Breadcrumbs
- Optimized image usage via `next/image`
- SEO-friendly URLs:

/product/slug
/category/slug

---

# Performance Rules

- Lazy load heavy components
- Code splitting by route
- Optimize LCP, CLS, FID
- Avoid unnecessary re-renders
- Use memoization only where meaningful

---

# API & Business Logic Rules

- API calls go inside `services/`
- No API logic inside UI components
- Use reusable API clients
- Follow clean response handling
- Cache where applicable

---

# Explanation Requirement

Every code change must explain:

- What changed
- Why it was required
- How it works (simple & brief)

---

# Refactoring & Safety Rules

- Do NOT break existing functionality
- Changes must be backward-compatible
- Avoid refactoring unrelated areas unless requested
- Keep code clean, readable, and scalable

---

# E-commerce Best Practices (Additional)

- Clean product domain model
- Cart persistence (local + backend ready)
- Price & currency formatting helpers
- Inventory & availability logic
- Secure checkout flow
- Future-ready for payments (Stripe/Razorpay)
- Analytics-ready events (GA4 / Pixel)

---

# Documentation Rules

- All guide MD files must be created in `public\docs`
- This ensures documentation is accessible and organized in a single location
- Never create guide files in root or other directories

---

# Next.js Configuration & Dynamic Routing Rules (CRITICAL)

## Static Export Configuration

**NEVER use `output: "export"` in `next.config.ts` when working with dynamic API-based routes.**

**Why:**

- Static export requires all dynamic routes to have params generated at build time
- API-based applications need runtime data fetching
- Causes error: "Page is missing param in generateStaticParams()"

**Correct Configuration:**

```typescript
// ✅ CORRECT - For API-based E-commerce applications
const nextConfig = {
  images: {
    unoptimized: true,
  },
};
```

**WRONG Configuration:**

```typescript
// ❌ NEVER DO THIS with dynamic API routes
const nextConfig = {
  output: "export", // This breaks dynamic routing
  images: {
    unoptimized: true,
  },
};
```

## Dynamic Route Naming Rules

**Use consistent parameter names across all dynamic routes. NEVER mix different param names for the same route.**

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

**WRONG Structure:**

```
app/
  product/
    [id]/          ❌ Don't have both
      page.tsx
    [slug]/        ❌ This causes conflict
      page.tsx
```

## generateStaticParams() Pattern

**For dynamic API routes, `generateStaticParams()` MUST return an empty array.**

```typescript
// ✅ CORRECT - For dynamic API routes
export async function generateStaticParams() {
  return [];
}
```

**Don't Do:**

```typescript
// ❌ WRONG - Don't fetch all products at build time
export async function generateStaticParams() {
  const products = await fetchAllProducts();
  return products.map((p) => ({ id: p.id }));
}
```

## Route Parameter Usage

**ALWAYS use `_id` from API responses for navigation, NOT `slug`.**

**Why:**

- API identifies products by `_id`
- Ensures consistent data fetching
- Prevents 404 errors

**Correct Implementation:**

```typescript
// ✅ CORRECT - Use product ID for navigation
const productUrl = ROUTES.PRODUCT_DETAIL(product.id);

// In ROUTES constant
PRODUCT_DETAIL: (id: string) => `/product/${id}`;

// In page.tsx
interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const { id } = await params;
const product = await productService.getProductById(id);
```

## Product Adapter Pattern (MANDATORY)

**ALWAYS use adapter pattern to transform API products to UI products.**

**Why:**

- API uses `_id`, UI uses `id`
- Different field structures between API and UI
- Ensures type safety

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

## Cache Management

**ALWAYS clear `.next` cache when changing route structure or configuration.**

```bash
# Windows PowerShell
Remove-Item -Path ".next" -Recurse -Force

# Then restart dev server
npm run dev
```

## Component File Organization

**Keep related components in the same directory as the page that uses them.**

```
app/
  product/
    [id]/
      page.tsx                    ✅ Main page
      ProductDetailClient.tsx     ✅ Client component
      ProductTabs.tsx            ✅ Related component
```

## Common Errors & Quick Fixes

### Error: "You cannot use different slug names for the same dynamic path"

**Fix:**

1. Check for multiple dynamic route folders (e.g., `[id]` and `[slug]`)
2. Remove conflicting folders
3. Keep only one dynamic route folder
4. Clear `.next` cache
5. Restart dev server

### Error: "Page is missing param in generateStaticParams()"

**Fix:**

1. Remove `output: "export"` from `next.config.ts`
2. Keep `generateStaticParams()` returning empty array
3. Restart dev server

### Error: "Module not found: Can't resolve './ComponentName'"

**Fix:**

1. Verify component file exists in the same directory
2. Check file name casing matches import
3. Ensure file has proper export
4. Clear `.next` cache
5. Restart dev server

## Checklist for New Dynamic Routes

Before creating any new dynamic route:

- [ ] Ensure `output: "export"` is NOT in `next.config.ts`
- [ ] Use consistent param names (prefer `[id]` over `[slug]`)
- [ ] Implement `generateStaticParams()` returning `[]`
- [ ] Create service method for fetching by ID
- [ ] Create adapter to transform API data to UI data
- [ ] Use relative imports for local components
- [ ] Define proper TypeScript interfaces
- [ ] Test with actual API data
- [ ] Clear cache before testing
- [ ] Verify no duplicate dynamic folders exist

## When to Use Static Export

**Use `output: "export"` ONLY when:**

- Building a completely static site
- No dynamic API calls
- All data known at build time
- Deploying to static hosting (GitHub Pages, etc.)

**DON'T use `output: "export"` when:**

- Fetching data from external APIs ✅ (Our E-commerce case)
- Using dynamic routes with runtime data ✅ (Our E-commerce case)
- Need server-side rendering
- Need API routes
