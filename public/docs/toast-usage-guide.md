# Toast Notification System - Usage Guide

## Overview

The toast notification system provides a centralized way to display success, error, info, and warning messages throughout the application. It's built on top of `sonner` and integrates seamlessly with API responses.

---

## Installation

The toast system is already installed and configured in the application:

- **Package**: `sonner`
- **Location**: `src/lib/toast.ts`
- **Types**: `src/types/toast.ts`
- **Provider**: Integrated in `app/layout.tsx`

---

## Basic Usage

### Import the Toast Service

```typescript
import { toast } from '@/lib/toast';
```

### Display Simple Messages

```typescript
// Success message
toast.success('Operation completed successfully!');

// Error message
toast.error('Something went wrong!');

// Info message
toast.info('Please check your email');

// Warning message
toast.warning('Your session is about to expire');
```

### Custom Duration

```typescript
// Show toast for 5 seconds
toast.success('Saved!', 5000);

// Show toast for 10 seconds
toast.error('Critical error occurred', 10000);
```

---

## API Response Integration

### Automatic Toast from API Response

The `handleAPIResponse` method automatically shows toasts based on API response structure.

#### Example 1: Success Response

```typescript
import { toast } from '@/lib/toast';
import { cartService } from '@/features/cart/services/cart.service';

async function addToCart(productId: string) {
  try {
    const response = await cartService.addToCart({
      productId,
      variantId: 'variant-123',
      size: 'M',
      quantity: 1
    });
    
    // Response: { message: "Cart updated", success: true }
    toast.handleAPIResponse(response);
    // ✅ Shows success toast: "Cart updated"
    
  } catch (error) {
    toast.handleAPIError(error);
    // ❌ Shows error toast with error message
  }
}
```

#### Example 2: Custom Message Override

```typescript
async function updateProfile(data: ProfileData) {
  try {
    const response = await authService.updateProfile(data);
    
    // Override API message with custom message
    toast.handleAPIResponse(response, {
      customMessage: 'Your profile has been updated successfully!'
    });
    // ✅ Shows: "Your profile has been updated successfully!"
    
  } catch (error) {
    toast.handleAPIError(error, {
      customMessage: 'Failed to update profile. Please try again.'
    });
  }
}
```

#### Example 3: Silent API Call (No Toast)

```typescript
async function fetchUserData() {
  try {
    const response = await authService.getProfile();
    
    // Don't show toast for this API call
    toast.handleAPIResponse(response, {
      doNotShow: true
    });
    // ✅ No toast displayed
    
  } catch (error) {
    // Still show error toast
    toast.handleAPIError(error);
  }
}
```

#### Example 4: Silent Error Handling

```typescript
async function backgroundSync() {
  try {
    const response = await syncService.sync();
    toast.handleAPIResponse(response, { doNotShow: true });
  } catch (error) {
    // Don't show error toast for background operations
    toast.handleAPIError(error, { doNotShow: true });
    console.error('Background sync failed:', error);
  }
}
```

---

## Advanced Usage

### Custom Toast Type

```typescript
import { toast } from '@/lib/toast';

// Use custom method for specific type
toast.custom('success', 'Payment processed!', { duration: 5000 });
toast.custom('warning', 'Low stock available', { duration: 4000 });
```

### Conditional Toast Display

```typescript
async function deleteItem(itemId: string, silent: boolean = false) {
  try {
    const response = await itemService.delete(itemId);
    
    toast.handleAPIResponse(response, {
      doNotShow: silent,
      customMessage: silent ? undefined : 'Item deleted successfully'
    });
    
  } catch (error) {
    toast.handleAPIError(error, {
      doNotShow: silent
    });
  }
}

// Show toast
await deleteItem('item-123', false);

// Silent deletion
await deleteItem('item-456', true);
```

---

## Real-World Examples

### Example 1: Cart Operations

```typescript
'use client';

import { useState } from 'react';
import { toast } from '@/lib/toast';
import { cartService } from '@/features/cart/services/cart.service';

export function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const response = await cartService.addToCart({
        productId,
        variantId: 'variant-1',
        size: 'M',
        quantity: 1
      });
      
      // API Response: { message: "Cart updated" }
      toast.handleAPIResponse(response, {
        customMessage: 'Product added to cart!'
      });
      
    } catch (error) {
      toast.handleAPIError(error, {
        customMessage: 'Failed to add product to cart'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleAddToCart} disabled={loading}>
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
```

### Example 2: Authentication

```typescript
'use client';

import { toast } from '@/lib/toast';
import { authService } from '@/features/auth/services/auth.service';

async function handleLogin(email: string, password: string) {
  try {
    const response = await authService.login({ email, password });
    
    // Show success toast
    toast.handleAPIResponse(response, {
      customMessage: `Welcome back, ${response.data?.name || 'User'}!`
    });
    
    // Redirect to dashboard
    window.location.href = '/dashboard';
    
  } catch (error) {
    toast.handleAPIError(error, {
      customMessage: 'Invalid email or password'
    });
  }
}
```

### Example 3: Form Submission

```typescript
'use client';

import { toast } from '@/lib/toast';
import { contactService } from '@/features/contact/services/contact.service';

async function handleContactForm(formData: ContactFormData) {
  try {
    const response = await contactService.submit(formData);
    
    toast.handleAPIResponse(response, {
      customMessage: 'Thank you! We will get back to you soon.',
      duration: 5000
    });
    
    // Reset form
    resetForm();
    
  } catch (error) {
    toast.handleAPIError(error);
  }
}
```

### Example 4: Wishlist Toggle

```typescript
'use client';

import { toast } from '@/lib/toast';
import { wishlistService } from '@/features/wishlist/services/wishlist.service';

async function toggleWishlist(productId: string, isInWishlist: boolean) {
  try {
    if (isInWishlist) {
      const response = await wishlistService.remove(productId);
      toast.handleAPIResponse(response, {
        customMessage: 'Removed from wishlist'
      });
    } else {
      const response = await wishlistService.add(productId);
      toast.handleAPIResponse(response, {
        customMessage: 'Added to wishlist'
      });
    }
  } catch (error) {
    toast.handleAPIError(error);
  }
}
```

---

## API Response Structure

### Expected Response Format

```typescript
interface APIResponse<T = unknown> {
  message?: string;      // Message to display
  data?: T;             // Response data
  error?: string;       // Error message (if any)
  success?: boolean;    // Success flag
}
```

### Success Response Example

```json
{
  "message": "Cart updated",
  "success": true,
  "data": {
    "cartId": "cart-123",
    "itemCount": 3
  }
}
```

### Error Response Example

```json
{
  "message": "Product out of stock",
  "success": false,
  "error": "PRODUCT_OUT_OF_STOCK"
}
```

---

## Toast Options

```typescript
interface ToastOptions {
  customMessage?: string;  // Override API message
  doNotShow?: boolean;     // Suppress toast display
  duration?: number;       // Display duration in ms (default: 3000)
}
```

---

## Best Practices

### 1. Use Custom Messages for User-Friendly Text

```typescript
// ❌ Don't rely on technical API messages
toast.handleAPIResponse(response);
// Shows: "CART_UPDATE_SUCCESS"

// ✅ Provide user-friendly messages
toast.handleAPIResponse(response, {
  customMessage: 'Item added to your cart!'
});
```

### 2. Silent Background Operations

```typescript
// ✅ Don't show toasts for background sync
async function autoSave() {
  try {
    const response = await draftService.save(data);
    toast.handleAPIResponse(response, { doNotShow: true });
  } catch (error) {
    toast.handleAPIError(error, { doNotShow: true });
  }
}
```

### 3. Appropriate Duration

```typescript
// Quick actions: 3 seconds (default)
toast.success('Saved!');

// Important messages: 5-7 seconds
toast.success('Order placed successfully!', 5000);

// Critical errors: 7-10 seconds
toast.error('Payment failed. Please try again.', 7000);
```

### 4. Consistent Error Handling

```typescript
// ✅ Always handle errors with toast
async function apiCall() {
  try {
    const response = await service.method();
    toast.handleAPIResponse(response);
  } catch (error) {
    toast.handleAPIError(error);
  }
}
```

---

## TypeScript Support

All toast methods are fully typed:

```typescript
import { toast } from '@/lib/toast';
import type { APIResponse, ToastOptions } from '@/types/toast';

// Type-safe API response
const response: APIResponse<{ userId: string }> = await authService.login(data);

// Type-safe options
const options: ToastOptions = {
  customMessage: 'Login successful!',
  duration: 4000
};

toast.handleAPIResponse(response, options);
```

---

## Troubleshooting

### Toast Not Appearing

1. Verify `Toaster` component is in `app/layout.tsx`
2. Check if `doNotShow: true` is set
3. Ensure API response has a `message` field

### Wrong Toast Type

- Success toast shows when `response.success !== false` and no `error` field
- Error toast shows when `response.success === false` or `error` field exists

### Custom Styling

The Toaster is configured with:
- Position: `top-right`
- Rich colors: Enabled
- Close button: Enabled

To customize, edit `app/layout.tsx`:

```typescript
<Toaster 
  position="bottom-center" 
  richColors 
  closeButton 
  duration={4000}
/>
```

---

## Summary

- **Import**: `import { toast } from '@/lib/toast';`
- **Simple**: `toast.success('Message')`
- **API Response**: `toast.handleAPIResponse(response, options)`
- **API Error**: `toast.handleAPIError(error, options)`
- **Custom Message**: `{ customMessage: 'Your message' }`
- **Silent Mode**: `{ doNotShow: true }`
- **Custom Duration**: `{ duration: 5000 }`
