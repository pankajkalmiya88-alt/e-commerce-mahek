"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { cartService } from "@/features/cart/services/cart.service";
import { wishlistService } from "@/features/wishlist/services/wishlist.service";
import { isAuthenticated } from "@/lib/auth-utils";

interface CartWishlistContextType {
  cartCount: number;
  wishlistCount: number;
  refreshCounts: () => Promise<void>;
  incrementCartCount: () => void;
  decrementCartCount: () => void;
  incrementWishlistCount: () => void;
  decrementWishlistCount: () => void;
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined);

export function CartWishlistProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const fetchCounts = async () => {
    if (!isAuthenticated()) {
      setCartCount(0);
      setWishlistCount(0);
      return;
    }

    try {
      const [cart, wishlist] = await Promise.all([
        cartService.getCartCount(),
        wishlistService.getWishlistCount(),
      ]);
      setCartCount(cart);
      setWishlistCount(wishlist);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  useEffect(() => {
    fetchCounts();

    const handleStorageChange = () => {
      fetchCounts();
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      if (isAuthenticated()) {
        fetchCounts();
      }
    }, 30000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const refreshCounts = async () => {
    await fetchCounts();
  };

  const incrementCartCount = () => setCartCount((prev) => prev + 1);
  const decrementCartCount = () => setCartCount((prev) => Math.max(0, prev - 1));
  const incrementWishlistCount = () => setWishlistCount((prev) => prev + 1);
  const decrementWishlistCount = () => setWishlistCount((prev) => Math.max(0, prev - 1));

  return (
    <CartWishlistContext.Provider
      value={{
        cartCount,
        wishlistCount,
        refreshCounts,
        incrementCartCount,
        decrementCartCount,
        incrementWishlistCount,
        decrementWishlistCount,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}

export function useCartWishlist() {
  const context = useContext(CartWishlistContext);
  if (context === undefined) {
    throw new Error("useCartWishlist must be used within a CartWishlistProvider");
  }
  return context;
}
