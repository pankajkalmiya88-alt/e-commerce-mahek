# Mahek Sarees - E-commerce Platform

Production-grade E-commerce website built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Fonts:** Playfair Display, Lato (Google Fonts)
- **Image Optimization:** Next.js Image component
- **State Management:** Ready for Zustand integration
- **SEO:** Built-in metadata generation & structured data

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                # Reusable UI components (Button, Rating, Price, Badge)
│   ├── layout/            # Layout components (Header, Footer, TopBar, MarqueeBar)
│   ├── product/           # Product-related components
│   ├── category/          # Category components
│   └── review/            # Review components
├── features/
│   └── home/              # Landing page sections
├── constants/             # App constants (routes, categories, site config)
├── types/                 # TypeScript type definitions
├── lib/
│   ├── utils/             # Utility functions (currency, SEO, cn)
│   ├── structured-data/   # Schema.org structured data generators
│   └── fonts.ts           # Font configuration
└── data/                  # Mock data (products, reviews)
```

## 🎨 Design System

All design tokens are centralized in `tailwind.config.ts`:

- **Colors:** Primary, secondary, accent, text, background, borders
- **Typography:** Playfair Display (headings), Lato (body)
- **Spacing:** Consistent spacing scale
- **Shadows:** Predefined shadow utilities
- **Border Radius:** Standardized radius values

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Copy Images

Copy all images from the HTML project to the Next.js public folder:

```bash
# From: C:\Users\divya\Documents\Pankaj Work\Mahek Saree_html\assets\images\
# To: C:\Users\divya\Documents\Pankaj Work\mahek\public\images\
```

Required images:

- `mahek_sarees_logo.svg`
- `top-slider.png`
- `categories1.png` through `categories5.png`
- `ps1.png` through `ps13.png`
- `flash_salebg.png`
- `free-shipping.svg`, `nochanges.svg`, `card-credit.svg`, `worldshipping.svg`
- `payment.png`
- Category images: `cate1.png` through `cate5.png`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Features

### ✅ Completed

- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Component Architecture:** Fully reusable, DRY components
- **Type Safety:** Strict TypeScript with comprehensive type definitions
- **SEO Optimized:** Metadata generation, structured data, semantic HTML
- **Performance:** Optimized images, code splitting, lazy loading
- **Design System:** Centralized Tailwind theme tokens
- **Landing Page:** Complete conversion with all sections:
  - Hero Banner
  - Category Circles
  - Best Selling Products
  - Trending Collection
  - Flash Sale Countdown
  - Reviews Section
  - Features Bar
  - Footer

### 🔜 Ready for Implementation

- **Cart Management:** Zustand store structure prepared
- **Product Pages:** Dynamic routes configured
- **Category Pages:** Filtering and sorting ready
- **Wishlist:** Component structure in place
- **Search:** Search UI implemented
- **Authentication:** Login/signup routes defined
- **Payment Integration:** Stripe/Razorpay ready
- **Order Tracking:** Route structure prepared

## 📦 Components

### UI Components

- `Button` - Variants: primary, secondary, outline, link
- `Rating` - Star rating display
- `Price` - Price with discount display
- `Badge` - Product labels (sale, pre-order, new, sold-out)

### Product Components

- `ProductCard` - Reusable product card with hover effects
- `CategoryCircle` - Category navigation circles
- `ReviewCard` - Customer review display

### Layout Components

- `Header` - Main navigation with search, cart, wishlist
- `Footer` - Multi-column footer with links
- `TopBar` - Announcement and social links
- `MarqueeBar` - Scrolling promotional messages

## 🎨 Styling Guidelines

- **Tailwind Only:** No custom CSS files
- **Design Tokens:** Use theme values from `tailwind.config.ts`
- **Responsive:** Mobile-first breakpoints (sm, md, lg, xl)
- **Consistency:** Reuse spacing, colors, and typography tokens

## 📝 TypeScript Types

All types are defined in `src/types/`:

- `product.ts` - Product, ProductCard, ProductLabel, StockStatus
- `cart.ts` - Cart, CartItem, CartState
- `review.ts` - Review, ReviewCard
- `common.ts` - NavLink, FeatureItem, CategoryCard, BannerSlide

## 🔗 Routes

Defined in `src/constants/routes.ts`:

- `/` - Home
- `/shop` - Shop
- `/product/[slug]` - Product detail
- `/category/[slug]` - Category listing
- `/cart` - Shopping cart
- `/checkout` - Checkout
- `/wishlist` - Wishlist
- `/track-order` - Order tracking

## 🌐 SEO Features

- Dynamic metadata generation
- Open Graph tags
- Twitter Card tags
- Schema.org structured data:
  - Organization
  - Product
  - Breadcrumb
  - Review
- Semantic HTML structure
- Optimized images with alt text

## 🎯 Next Steps

1. **Copy Images:** Transfer all images from HTML project
2. **Install Dependencies:** Run `npm install`
3. **Test Application:** Run `npm run dev`
4. **Add Real Data:** Replace mock data with API integration
5. **Implement Cart:** Add Zustand store for cart management
6. **Add Authentication:** Implement login/signup functionality
7. **Payment Gateway:** Integrate Stripe or Razorpay
8. **Deploy:** Deploy to Vercel or your preferred platform

## 📚 Documentation

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

Follow the project rules defined in `.windsurf/rules/mahek-rules.md`

## 📄 License

Copyright 2026 © Mahek Sarees All Rights Reserved.
