# Wishlist Feature Guide

## Overview

The Wishlist feature allows authenticated users to save products they're interested in for later purchase. This guide covers the complete implementation including API integration, UI components, and user flows.

## Features

### Core Functionality
- ✅ Add products to wishlist from product cards
- ✅ View all wishlist items in a dedicated page
- ✅ Remove items from wishlist
- ✅ Add items from wishlist to cart
- ✅ Authentication-required access
- ✅ Real-time wishlist state management
- ✅ Responsive grid layout
- ✅ Loading and empty states

### User Experience
- Heart icon on product cards for quick wishlist toggle
- Visual feedback (filled heart) for items in wishlist
- Hover effects on wishlist button
- Opens product details in new tab when clicked
- Automatic redirect to login for unauthenticated users
- Item count display on wishlist page

## API Endpoints

### Base URL
```
https://mahek-saree-develop.onrender.com/api
```

### 1. Get Wishlist
**Endpoint:** `GET /wishlist/list`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "items": [
    {
      "_id": "item_id",
      "product": {
        "_id": "product_id",
        "name": "Product Name",
        "slug": "product-slug",
        "price": 4350,
        "discountPercent": 10,
        "oldPrice": 4850,
        "images": ["image_url"],
        "category": "SAREE",
        "averageRating": 4.5,
        "totalReviews": 18,
        "stock": 10,
        "availability": "IN_STOCK"
      },
      "addedAt": "2024-02-08T10:00:00Z"
    }
  ],
  "total": 1
}
```

### 2. Add to Wishlist
**Endpoint:** `POST /wishlist/add`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "productId": "product_id"
}
```

### 3. Remove from Wishlist
**Endpoint:** `DELETE /wishlist/remove/{productId}`

**Headers:**
```
Authorization: Bearer {token}
```

### 4. Add to Cart (from Wishlist)
**Endpoint:** `POST /cart/add-to-cart`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "productId": "product_id",
  "quantity": 1
}
```

## Implementation Files

### 1. Types
**File:** `src/features/wishlist/types/index.ts`

Defines TypeScript interfaces for:
- `WishlistProduct` - Product data in wishlist
- `WishlistItem` - Wishlist item with product and metadata
- `WishlistResponse` - API response structure
- `AddToWishlistRequest` - Add to wishlist payload
- `AddToCartRequest` - Add to cart payload

### 2. Service
**File:** `src/features/wishlist/services/wishlist.service.ts`

**Methods:**
- `getWishlist()` - Fetch user's wishlist
- `addToWishlist(data)` - Add product to wishlist
- `removeFromWishlist(productId)` - Remove product from wishlist
- `addToCart(data)` - Add product to cart

**Features:**
- Automatic Bearer token injection via API client
- Error handling and logging
- TypeScript type safety

### 3. Wishlist Item Component
**File:** `src/features/wishlist/components/WishlistItem.tsx`

**Features:**
- Product image with discount badge
- Remove button (X icon) in top-right
- Product name (clickable, opens in new tab)
- Star rating display
- Price with discount information
- "Add to Cart" button
- Loading states for actions
- Out of stock handling

### 4. Wishlist Page
**File:** `app/wishlist/page.tsx`

**Features:**
- Authentication check
- Wishlist fetching on mount
- Grid layout (1-4 columns responsive)
- Item count display
- Empty state for no items
- Loading spinner
- Profile menu integration
- Real-time state updates after actions

### 5. ProductCard Integration
**File:** `src/components/product/ProductCard.tsx`

**Features:**
- Wishlist heart button with hover effects
- Toggle functionality (add/remove)
- Visual state (filled heart when in wishlist)
- Authentication check before action
- Redirect to login with referrer
- Loading state during API call

## User Flows

### Adding to Wishlist
1. User hovers over product card
2. Heart icon appears in top-right corner
3. User clicks heart icon
4. **If not authenticated:** Redirect to login with referrer
5. **If authenticated:** API call to add product
6. Heart fills with red color
7. Product added to wishlist

### Viewing Wishlist
1. User navigates to `/wishlist`
2. **If not authenticated:** Show empty state with login prompt
3. **If authenticated:** Fetch and display wishlist items
4. Show item count in header
5. Display products in responsive grid

### Removing from Wishlist
1. User clicks X button on wishlist item
2. API call to remove product
3. Item removed from grid
4. Item count updates
5. **If last item removed:** Show empty state

### Adding to Cart from Wishlist
1. User clicks "Add to Cart" button
2. API call to add product to cart (quantity: 1)
3. API call to remove product from wishlist
4. Item removed from wishlist grid
5. Item count updates
6. Product now in cart

### Opening Product Details
1. User clicks on product image or name
2. Product detail page opens in new tab
3. URL format: `/product/{slug}`
4. Original wishlist page remains open

## Styling & Design

### Wishlist Item Card
- **Layout:** Vertical card with image on top
- **Image:** 3:4 aspect ratio
- **Discount Badge:** Red, top-left corner
- **Remove Button:** White circle, top-right corner, X icon
- **Product Name:** Playfair Display font, 2-line clamp
- **Rating:** Yellow stars with review count
- **Price:** Bold current price, strikethrough original price
- **Button:** Primary color, full width, rounded

### Wishlist Page Layout
- **Desktop:** 4 columns
- **Tablet:** 3 columns
- **Mobile:** 1-2 columns
- **Spacing:** 1.5rem gap between items
- **Background:** Light gray (`bg-background-light`)

### ProductCard Heart Button
- **Default:** Gray outline heart
- **Hover:** Red outline heart with light red background
- **Active (in wishlist):** Filled red heart
- **Animation:** Scale up on hover (110%)
- **Transition:** 200ms smooth

## Authentication Flow

### Protected Access
```typescript
// Check authentication
if (!isAuthenticated()) {
  return <EmptyWishlist />;
}
```

### Login Redirect with Referrer
```typescript
// From ProductCard
if (!isAuthenticated()) {
  router.push(`/login?referrer=${encodeURIComponent(window.location.pathname)}`);
  return;
}
```

### After Login
- User redirected back to original page
- Can immediately add products to wishlist

## State Management

### Local State (Wishlist Page)
```typescript
const [wishlistItems, setWishlistItems] = useState<WishlistItemType[]>([]);
const [isFetching, setIsFetching] = useState(false);
```

### Local State (ProductCard)
```typescript
const [isInWishlist, setIsInWishlist] = useState(false);
const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
```

### State Updates
- Optimistic UI updates after successful API calls
- Automatic re-render when items added/removed
- Loading states prevent duplicate actions

## Error Handling

### API Errors
```typescript
try {
  await wishlistService.addToWishlist({ productId });
} catch (error) {
  console.error("Error adding to wishlist:", error);
  // Error logged, user sees no change in UI
}
```

### Network Failures
- Errors logged to console
- UI remains in previous state
- User can retry action

### Authentication Errors
- 401 errors handled by API client
- Automatic redirect to login
- Auth token removed from storage

## Performance Considerations

### Image Optimization
- Next.js Image component with `fill` layout
- Responsive `sizes` attribute
- Lazy loading by default

### API Calls
- Single fetch on page load
- Optimistic UI updates
- No unnecessary re-fetching

### State Updates
- Efficient array filtering for removals
- Minimal re-renders
- Loading states prevent race conditions

## Future Enhancements

### Potential Features
- [ ] Bulk add to cart (select multiple items)
- [ ] Move all to cart button
- [ ] Wishlist sharing (public/private)
- [ ] Price drop notifications
- [ ] Back in stock alerts
- [ ] Wishlist collections/folders
- [ ] Sort and filter wishlist items
- [ ] Wishlist item count in header
- [ ] Recently viewed vs wishlist comparison

### Technical Improvements
- [ ] Wishlist sync across devices
- [ ] Offline wishlist support
- [ ] Wishlist analytics
- [ ] A/B testing for wishlist CTAs
- [ ] Wishlist item recommendations

## Testing

### Manual Testing Checklist
- [ ] Add product to wishlist (authenticated)
- [ ] Add product to wishlist (unauthenticated - should redirect)
- [ ] Remove product from wishlist
- [ ] Add to cart from wishlist
- [ ] Open product in new tab
- [ ] View empty wishlist state
- [ ] Check responsive layout (mobile/tablet/desktop)
- [ ] Verify loading states
- [ ] Test error scenarios (network failure)
- [ ] Check heart icon state persistence

### API Testing
```bash
# Get wishlist
curl --location 'https://mahek-saree-develop.onrender.com/api/wishlist/list' \
--header 'Authorization: Bearer {token}'

# Add to wishlist
curl --location 'https://mahek-saree-develop.onrender.com/api/wishlist/add' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {token}' \
--data '{"productId": "product_id"}'

# Remove from wishlist
curl --location --request DELETE 'https://mahek-saree-develop.onrender.com/api/wishlist/remove/{productId}' \
--header 'Authorization: Bearer {token}'

# Add to cart
curl --location 'https://mahek-saree-develop.onrender.com/api/cart/add-to-cart' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {token}' \
--data '{"productId": "product_id", "quantity": 1}'
```

## Troubleshooting

### Heart icon not toggling
- Check if user is authenticated
- Verify API token is valid
- Check browser console for errors

### Wishlist page shows empty state
- Verify user is logged in
- Check API response in network tab
- Ensure Bearer token is being sent

### Items not removing from wishlist
- Check API response status
- Verify productId is correct
- Check for network errors

### Add to cart not working
- Verify cart API endpoint is accessible
- Check product availability
- Ensure quantity is valid

## Best Practices

### Code Organization
- Keep wishlist logic in feature folder
- Separate concerns (service, types, components)
- Reusable components for consistency

### User Experience
- Always show loading states
- Provide visual feedback for actions
- Handle errors gracefully
- Maintain state consistency

### Performance
- Minimize API calls
- Optimize images
- Use efficient state updates
- Implement proper error boundaries

### Security
- Always check authentication
- Use Bearer tokens correctly
- Validate user permissions
- Sanitize user inputs
