# API Client & Interceptor Guide

## Overview

The application uses a centralized API client with built-in interceptor functionality to handle all HTTP requests. This ensures consistent authentication, error handling, and request/response processing across the entire application.

## Features

- ✅ Automatic Bearer token injection in request headers
- ✅ Centralized error handling
- ✅ Request/Response interceptors
- ✅ Automatic redirect to login on 401 Unauthorized
- ✅ TypeScript support with generics
- ✅ RESTful methods (GET, POST, PUT, PATCH, DELETE)

## Location

**File**: `@/lib/api-client.ts`

## How It Works

### 1. Request Interceptor (Automatic Bearer Token)

Every API request automatically includes the Bearer token from localStorage:

```typescript
apiClient.addRequestInterceptor((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return config;
});
```

**What happens:**
- Before each request, the interceptor checks for `authToken` in localStorage
- If found, it adds `Authorization: Bearer <token>` to the request headers
- No need to manually add auth headers in your API calls

### 2. Error Interceptor (Auto Logout on 401)

Automatically handles unauthorized requests:

```typescript
apiClient.addErrorInterceptor((error) => {
  if (error.message.includes("401") || error.message.includes("Unauthorized")) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }
  }
});
```

**What happens:**
- If any API returns 401 Unauthorized
- Auth data is cleared from localStorage
- User is automatically redirected to login page

## Usage Examples

### Basic Usage

```typescript
import apiClient from "@/lib/api-client";

// GET request
const products = await apiClient.get("/api/products");

// POST request
const newProduct = await apiClient.post("/api/products", {
  name: "Product Name",
  price: 99.99
});

// PUT request
const updated = await apiClient.put("/api/products/123", {
  name: "Updated Name"
});

// PATCH request
const patched = await apiClient.patch("/api/products/123", {
  price: 89.99
});

// DELETE request
await apiClient.delete("/api/products/123");
```

### With TypeScript Types

```typescript
import apiClient from "@/lib/api-client";

interface Product {
  id: string;
  name: string;
  price: number;
}

// Type-safe GET request
const products = await apiClient.get<Product[]>("/api/products");

// Type-safe POST request
const newProduct = await apiClient.post<Product>("/api/products", {
  name: "New Product",
  price: 99.99
});
```

### Creating a Service

Create reusable service modules for different features:

```typescript
// src/features/product/services/product.service.ts
import apiClient from "@/lib/api-client";
import type { Product, CreateProductRequest } from "../types";

export const productService = {
  async getAll(): Promise<Product[]> {
    return apiClient.get<Product[]>("/api/products");
  },

  async getById(id: string): Promise<Product> {
    return apiClient.get<Product>(`/api/products/${id}`);
  },

  async create(data: CreateProductRequest): Promise<Product> {
    return apiClient.post<Product>("/api/products", data);
  },

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return apiClient.put<Product>(`/api/products/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/products/${id}`);
  },
};
```

### Using in Components

```typescript
"use client";

import { useState, useEffect } from "react";
import { productService } from "@/features/product/services/product.service";
import type { Product } from "@/features/product/types";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await productService.delete(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

## Advanced: Custom Interceptors

You can add custom interceptors for specific needs:

```typescript
import apiClient from "@/lib/api-client";

// Add custom request interceptor
apiClient.addRequestInterceptor((config) => {
  // Add custom headers
  config.headers = {
    ...config.headers,
    "X-Custom-Header": "value",
  };
  
  // Log requests in development
  if (process.env.NODE_ENV === "development") {
    console.log("Request:", config.url);
  }
  
  return config;
});

// Add custom response interceptor
apiClient.addResponseInterceptor((response) => {
  // Log responses in development
  if (process.env.NODE_ENV === "development") {
    console.log("Response:", response.status);
  }
  
  return response;
});

// Add custom error interceptor
apiClient.addErrorInterceptor((error) => {
  // Send errors to analytics
  if (typeof window !== "undefined") {
    // analytics.track("api_error", { message: error.message });
  }
});
```

## Creating Multiple API Clients

For different base URLs or configurations:

```typescript
import { ApiClient } from "@/lib/api-client";

// Create a client for external API
const externalApiClient = new ApiClient({
  baseURL: "https://external-api.com",
  headers: {
    "X-API-Key": process.env.NEXT_PUBLIC_EXTERNAL_API_KEY,
  },
});

// Use it
const data = await externalApiClient.get("/endpoint");
```

## Benefits

### 1. **DRY Principle**
- No need to repeat auth headers in every API call
- Centralized error handling logic
- Consistent request/response processing

### 2. **Security**
- Automatic token injection ensures all protected endpoints are authenticated
- Automatic logout on token expiration
- No risk of forgetting to add auth headers

### 3. **Maintainability**
- Single place to update API logic
- Easy to add logging, analytics, or monitoring
- Type-safe with TypeScript

### 4. **Developer Experience**
- Simple, clean API calls
- Automatic error handling
- No boilerplate code

## Migration from Fetch

**Before (manual fetch):**
```typescript
const token = localStorage.getItem("authToken");
const response = await fetch("/api/products", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

if (!response.ok) {
  throw new Error("Failed to fetch");
}

const data = await response.json();
```

**After (with API client):**
```typescript
const data = await apiClient.get("/api/products");
```

## Important Notes

1. **Auth Service Exception**: The `verifyOtp` method in auth service still uses native `fetch` to extract the Bearer token from response headers. This is intentional as the token needs to be stored before the interceptor can use it.

2. **Base URL**: Set `NEXT_PUBLIC_API_URL` in your `.env` file for the API base URL.

3. **Client-Side Only**: The interceptors work in the browser. For server-side API calls, you'll need to pass the token manually.

4. **Error Handling**: All API errors are thrown and should be caught with try-catch blocks.

## Example Services

See `@/lib/api/example-service.ts` for complete examples of:
- Product service (CRUD operations)
- User service (Profile management)

These demonstrate best practices for creating type-safe, reusable API services.
