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
