# Profile Menu & Authenticated User Experience Guide

## Overview

The application now includes a comprehensive profile menu system that displays user information and navigation options for authenticated users. The system prevents logged-in users from accessing the login page and provides a consistent navigation experience across profile, wishlist, and cart pages.

## Features

- ✅ Profile menu with user information (name, email)
- ✅ Tab navigation between Profile, Wishlist, and Bag
- ✅ Quick access menu items (Orders, Wishlist, Gift Cards, Contact Us)
- ✅ Account management options (Coupons, Saved Cards, Saved Addresses)
- ✅ Edit Profile and Logout functionality
- ✅ Prevents authenticated users from accessing login page
- ✅ Matches Myntra's profile menu design

## Login Page Redirect

### Behavior

When an authenticated user tries to access `/login`:
1. System checks for `authToken` and `userData` in localStorage
2. If both exist, user is redirected away from login page
3. Redirect destination:
   - If `referrer` query param exists → Redirect to that page
   - Otherwise → Redirect to home page `/`

### Implementation

```typescript
// app/login/page.tsx
useEffect(() => {
  const token = localStorage.getItem("authToken");
  const userData = localStorage.getItem("userData");
  
  if (token && userData) {
    const redirectUrl = getRedirectUrl(searchParams);
    router.replace(redirectUrl);
  }
}, [router, searchParams]);
```

### Examples

**Scenario 1: Direct login page access**
- User navigates to `/login`
- User is already logged in
- Redirected to `/` (home page)

**Scenario 2: Login with referrer**
- User clicks login from `/wishlist` → `/login?referrer=/wishlist`
- User is already logged in
- Redirected to `/wishlist`

## Profile Menu Component

### Location
`@/components/profile/ProfileMenu.tsx`

### Features

#### 1. Tab Navigation
Three main tabs at the top:
- **Profile** - User profile and account settings
- **Wishlist** - User's saved items
- **Bag** - Shopping cart

#### 2. User Information
Displays:
- User's name (e.g., "Hello Divyanshu")
- User's email or phone number

#### 3. Menu Sections

**Section 1: Shopping & Support**
- Orders → `/orders`
- Wishlist → `/wishlist`
- Gift Cards → `/gift-cards`
- Contact Us → `/contact`

**Section 2: Account Management**
- Coupons → `/coupons`
- Saved Cards → `/saved-cards`
- Saved Addresses → `/saved-addresses`

**Section 3: Profile Actions**
- Edit Profile → `/profile/edit`
- Logout → Clears auth data and redirects to home

### Usage

```typescript
import { ProfileMenu } from "@/components/profile/ProfileMenu";

export default function MyPage() {
  return (
    <div>
      <ProfileMenu activeTab="profile" />
      {/* Page content */}
    </div>
  );
}
```

**Props:**
- `activeTab`: `"profile" | "wishlist" | "bag"` - Highlights the active tab

## Page Implementations

### Profile Page (`/profile`)

```typescript
"use client";

import { ProfileMenu } from "@/components/profile/ProfileMenu";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background-light py-8 px-4">
      <div className="max-w-md mx-auto">
        <ProfileMenu activeTab="profile" />
      </div>
    </div>
  );
}
```

**Features:**
- Protected route (requires authentication)
- Shows profile menu with "Profile" tab active
- Redirects to login if not authenticated

### Wishlist Page (`/wishlist`)

```typescript
"use client";

import { ProfileMenu } from "@/components/profile/ProfileMenu";
import { EmptyWishlist } from "@/components/empty-states/EmptyWishlist";

export default function WishlistPage() {
  const [isAuth, setIsAuth] = useState(false);

  if (!isAuth) {
    return <EmptyWishlist isAuthenticated={false} />;
  }

  return (
    <div className="min-h-screen bg-background-light py-8 px-4">
      <div className="max-w-md mx-auto">
        <ProfileMenu activeTab="wishlist" />
        <div className="mt-6">
          <EmptyWishlist isAuthenticated={true} />
        </div>
      </div>
    </div>
  );
}
```

**Features:**
- Shows login prompt if not authenticated
- Shows profile menu with "Wishlist" tab active when authenticated
- Displays empty wishlist state below menu

### Cart Page (`/cart`)

```typescript
"use client";

import { ProfileMenu } from "@/components/profile/ProfileMenu";
import { EmptyCart } from "@/components/empty-states/EmptyCart";

export default function CartPage() {
  const [isAuth, setIsAuth] = useState(false);

  if (!isAuth) {
    return <EmptyCart isAuthenticated={false} />;
  }

  return (
    <div className="min-h-screen bg-background-light py-8 px-4">
      <div className="max-w-md mx-auto">
        <ProfileMenu activeTab="bag" />
        <div className="mt-6">
          <EmptyCart isAuthenticated={true} />
        </div>
      </div>
    </div>
  );
}
```

**Features:**
- Shows login prompt if not authenticated
- Shows profile menu with "Bag" tab active when authenticated
- Displays empty cart state below menu

## Logout Functionality

### Implementation

```typescript
import { clearAuth } from "@/lib/auth-utils";
import { useRouter } from "next/navigation";

const router = useRouter();

const handleLogout = () => {
  clearAuth(); // Removes authToken and userData from localStorage
  router.push("/"); // Redirects to home page
};
```

### What Happens on Logout

1. `authToken` removed from localStorage
2. `userData` removed from localStorage
3. User redirected to home page
4. All protected routes will now show login prompts
5. API requests will no longer include Bearer token

## User Flow Examples

### Flow 1: Logged-in user tries to access login page

1. User is logged in (has token and userData)
2. User navigates to `/login`
3. System detects authentication
4. User is redirected to home page `/`
5. User never sees the login form

### Flow 2: Accessing profile menu

1. User is logged in
2. User navigates to `/profile`
3. Profile menu displays with user info
4. User can navigate between Profile, Wishlist, and Bag tabs
5. User can access all menu items
6. User can logout

### Flow 3: Wishlist with profile menu

1. User is logged in
2. User navigates to `/wishlist`
3. Profile menu displays with "Wishlist" tab active
4. Empty wishlist state shows below menu
5. User can navigate to other sections via menu

## Styling & Design

### Design Principles
- Matches Myntra's profile menu design
- Clean, modern interface with Tailwind CSS
- Consistent spacing and typography
- Smooth transitions and hover effects
- Icons from Lucide React

### Color Scheme
- Primary text: `text-primary`
- Secondary text: `text-text-secondary`
- Active tab: `text-secondary` with bottom border
- Hover states: Smooth color transitions

### Layout
- Max width: `max-w-md` (centered)
- Background: `bg-background-light`
- Card style: White background with border and shadow
- Responsive padding and spacing

## Menu Items & Icons

| Item | Icon | Route |
|------|------|-------|
| Profile Tab | User | `/profile` |
| Wishlist Tab | Heart | `/wishlist` |
| Bag Tab | ShoppingBag | `/cart` |
| Orders | ShoppingBag | `/orders` |
| Wishlist | Heart | `/wishlist` |
| Gift Cards | Gift | `/gift-cards` |
| Contact Us | Phone | `/contact` |
| Coupons | CreditCard | `/coupons` |
| Saved Cards | CreditCard | `/saved-cards` |
| Saved Addresses | MapPin | `/saved-addresses` |
| Edit Profile | Edit | `/profile/edit` |
| Logout | LogOut | Clears auth |

## Future Enhancements

- Add profile edit functionality
- Implement orders page
- Add gift cards management
- Create saved cards interface
- Build saved addresses management
- Add coupons section
- Implement contact us form
- Add profile picture upload
- Show order count badges
- Add wishlist item count
- Display cart item count

## Testing Scenarios

### Test 1: Login Page Redirect
1. Login to the application
2. Try to navigate to `/login`
3. Should be redirected to home page
4. Should not see login form

### Test 2: Profile Menu Display
1. Login to the application
2. Navigate to `/profile`
3. Should see profile menu with user name and email
4. Should see all menu items
5. Profile tab should be highlighted

### Test 3: Tab Navigation
1. Login and go to `/profile`
2. Click "Wishlist" tab
3. Should navigate to `/wishlist`
4. Wishlist tab should be highlighted
5. Profile menu should remain visible

### Test 4: Logout
1. Login to the application
2. Navigate to `/profile`
3. Click "Logout" button
4. Should be redirected to home page
5. Try accessing `/profile` again
6. Should be redirected to login

## Related Files

- **Profile Menu**: `@/components/profile/ProfileMenu.tsx`
- **Profile Page**: `@/app/profile/page.tsx`
- **Wishlist Page**: `@/app/wishlist/page.tsx`
- **Cart Page**: `@/app/cart/page.tsx`
- **Login Page**: `@/app/login/page.tsx`
- **Auth Utils**: `@/lib/auth-utils.ts`
- **Empty States**: `@/components/empty-states/`

## Integration with Existing Features

### Works With
- ✅ Protected routes system
- ✅ Referrer-based redirects
- ✅ API client with Bearer token
- ✅ Auth service
- ✅ Empty state components

### Consistent Experience
- Same profile menu across all authenticated pages
- Unified navigation system
- Consistent styling and behavior
- Seamless integration with existing auth flow
