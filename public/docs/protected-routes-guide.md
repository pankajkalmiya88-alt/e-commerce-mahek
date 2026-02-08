# Protected Routes & Referrer Redirect Guide

## Overview

The application implements a protected route system that ensures users are authenticated before accessing certain pages. When unauthenticated users try to access protected pages like `/cart` or `/wishlist`, they are shown a login prompt and redirected to the login page with a referrer parameter. After successful authentication, users are automatically redirected back to their intended destination.

## Features

- ✅ Automatic authentication check on protected pages
- ✅ Referrer-based redirect after login
- ✅ Beautiful empty state screens for cart and wishlist
- ✅ Seamless user experience matching Myntra's flow
- ✅ TypeScript support with type safety

## How It Works

### 1. User Flow Example

**Scenario: User tries to access wishlist without logging in**

1. User navigates to `/wishlist`
2. System checks if user is authenticated
3. User is NOT authenticated → Shows "PLEASE LOG IN" message
4. User clicks "LOGIN" button
5. Redirected to `/login?referrer=/wishlist`
6. User completes login/signup with OTP
7. After successful authentication → Redirected back to `/wishlist`
8. User now sees their wishlist (or empty wishlist if no items)

### 2. Authentication Check

The system uses localStorage to check authentication:

```typescript
// src/lib/auth-utils.ts
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  
  const token = localStorage.getItem("authToken");
  const userData = localStorage.getItem("userData");
  
  return !!(token && userData);
};
```

### 3. Referrer URL Building

When redirecting to login, the current page URL is passed as a query parameter:

```typescript
export const buildLoginUrl = (referrer?: string): string => {
  if (!referrer) return "/login";
  
  const params = new URLSearchParams();
  params.set("referrer", referrer);
  
  return `/login?${params.toString()}`;
};
```

**Example:**
- Current page: `/wishlist`
- Login URL: `/login?referrer=/wishlist`

### 4. Post-Login Redirect

After successful OTP verification, the user is redirected to the referrer URL:

```typescript
export const getRedirectUrl = (searchParams: URLSearchParams): string => {
  return searchParams.get("referrer") || "/";
};
```

**Logic:**
- If `referrer` exists → Redirect to that page
- If no `referrer` → Redirect to home page `/`

## Implementation

### Cart Page (`/app/cart/page.tsx`)

```typescript
"use client";

import { useEffect, useState } from "react";
import { EmptyCart } from "@/components/empty-states/EmptyCart";
import { isAuthenticated } from "@/lib/auth-utils";

export default function CartPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return <LoadingSpinner />;
  }

  return <EmptyCart isAuthenticated={isAuth} />;
}
```

### Wishlist Page (`/app/wishlist/page.tsx`)

```typescript
"use client";

import { useEffect, useState } from "react";
import { EmptyWishlist } from "@/components/empty-states/EmptyWishlist";
import { isAuthenticated } from "@/lib/auth-utils";

export default function WishlistPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return <LoadingSpinner />;
  }

  return <EmptyWishlist isAuthenticated={isAuth} />;
}
```

### Empty State Components

#### EmptyCart Component

**Unauthenticated State:**
- Shows "PLEASE LOG IN" message
- Displays "Login to view items in your bag"
- LOGIN button with referrer: `/login?referrer=/cart`

**Authenticated Empty State:**
- Shows "Hey, it feels so light!" message
- Displays "There is nothing in your bag"
- "ADD ITEMS FROM WISHLIST" button → Links to `/wishlist`

#### EmptyWishlist Component

**Unauthenticated State:**
- Shows "PLEASE LOG IN" message
- Displays "Login to view items in your wishlist"
- LOGIN button with referrer: `/login?referrer=/wishlist`

**Authenticated Empty State:**
- Shows "Your Wishlist is Empty" message
- Displays helpful text about adding items
- "START SHOPPING" button → Links to home page

## Auth Utilities

### Available Functions

Located in `@/lib/auth-utils.ts`:

```typescript
// Check if user is authenticated
isAuthenticated(): boolean

// Get auth token from localStorage
getAuthToken(): string | null

// Get user data from localStorage
getUserData(): UserData | null

// Clear all auth data
clearAuth(): void

// Build login URL with referrer
buildLoginUrl(referrer?: string): string

// Get redirect URL from search params
getRedirectUrl(searchParams: URLSearchParams): string
```

### Usage Examples

**Check Authentication:**
```typescript
import { isAuthenticated } from "@/lib/auth-utils";

if (isAuthenticated()) {
  // User is logged in
} else {
  // User is not logged in
}
```

**Build Login URL with Referrer:**
```typescript
import { buildLoginUrl } from "@/lib/auth-utils";
import { usePathname } from "next/navigation";

const pathname = usePathname();
const loginUrl = buildLoginUrl(pathname);
// Result: /login?referrer=/current-page
```

**Get Redirect URL After Login:**
```typescript
import { getRedirectUrl } from "@/lib/auth-utils";
import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
const redirectUrl = getRedirectUrl(searchParams);
// If URL is /login?referrer=/wishlist
// Result: /wishlist
```

## Protected Route Wrapper (Optional)

For more complex scenarios, use the `ProtectedRoute` component:

```typescript
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div>
        {/* This content only shows to authenticated users */}
        <h1>My Profile</h1>
      </div>
    </ProtectedRoute>
  );
}
```

**Features:**
- Automatically redirects to login with referrer
- Shows loading spinner during auth check
- Optional fallback component

## Creating New Protected Pages

### Step 1: Create the Page Component

```typescript
"use client";

import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/auth-utils";

export default function MyProtectedPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsAuth(isAuthenticated());
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return <LoadingSpinner />;
  }

  if (!isAuth) {
    return <UnauthenticatedView />;
  }

  return <AuthenticatedView />;
}
```

### Step 2: Create Unauthenticated View

```typescript
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildLoginUrl } from "@/lib/auth-utils";

function UnauthenticatedView() {
  const pathname = usePathname();

  return (
    <div className="text-center">
      <h1>PLEASE LOG IN</h1>
      <p>Login to access this page</p>
      <Link href={buildLoginUrl(pathname)}>
        LOGIN
      </Link>
    </div>
  );
}
```

## Design Matching Myntra

The implementation closely matches Myntra's UX:

### Cart Page
- **Empty + Not Logged In**: "PLEASE LOG IN" with login button
- **Empty + Logged In**: "Hey, it feels so light!" with "ADD ITEMS FROM WISHLIST" button
- **Has Items**: Shows cart items (to be implemented)

### Wishlist Page
- **Empty + Not Logged In**: "PLEASE LOG IN" with login button
- **Empty + Logged In**: "Your Wishlist is Empty" with "START SHOPPING" button
- **Has Items**: Shows wishlist items (to be implemented)

## Benefits

1. **Seamless UX**: Users are redirected back to their intended page after login
2. **No Lost Context**: Referrer parameter preserves user intent
3. **Clean URLs**: Query parameters are automatically handled
4. **Type Safe**: Full TypeScript support
5. **Reusable**: Auth utilities can be used across the app
6. **Consistent**: Same pattern for all protected pages

## Testing the Flow

### Test Case 1: Wishlist Access (Not Logged In)
1. Clear localStorage (logout)
2. Navigate to `/wishlist`
3. Should see "PLEASE LOG IN" screen
4. Click "LOGIN" button
5. Should redirect to `/login?referrer=/wishlist`
6. Complete login with email + OTP
7. Should redirect back to `/wishlist`
8. Should see empty wishlist screen (authenticated)

### Test Case 2: Cart Access (Not Logged In)
1. Clear localStorage (logout)
2. Navigate to `/cart`
3. Should see "PLEASE LOG IN" screen
4. Click "LOGIN" button
5. Should redirect to `/login?referrer=/cart`
6. Complete login with email + OTP
7. Should redirect back to `/cart`
8. Should see empty cart screen with "ADD ITEMS FROM WISHLIST" button

### Test Case 3: Direct Login (No Referrer)
1. Navigate to `/login` directly
2. Complete login
3. Should redirect to home page `/`

## Future Enhancements

- Add actual cart and wishlist data fetching
- Implement "Add to Cart" and "Add to Wishlist" functionality
- Add product listings in cart/wishlist when items exist
- Implement cart/wishlist item management (remove, update quantity)
- Add wishlist to cart migration
- Persist cart/wishlist data to backend API

## Related Files

- **Auth Utils**: `@/lib/auth-utils.ts`
- **Protected Route**: `@/components/auth/ProtectedRoute.tsx`
- **Empty Cart**: `@/components/empty-states/EmptyCart.tsx`
- **Empty Wishlist**: `@/components/empty-states/EmptyWishlist.tsx`
- **Cart Page**: `@/app/cart/page.tsx`
- **Wishlist Page**: `@/app/wishlist/page.tsx`
- **Login Page**: `@/app/login/page.tsx`
