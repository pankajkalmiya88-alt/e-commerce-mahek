"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated as checkIsAuthenticated } from "@/lib/auth-utils";
import { EmptyWishlist } from "@/components/empty-states/EmptyWishlist";
import { ProfileMenu } from "@/components/profile/ProfileMenu";
import { WishlistItem } from "@/features/wishlist/components/WishlistItem";
import { wishlistService } from "@/features/wishlist/services/wishlist.service";
import type { WishlistItem as WishlistItemType } from "@/features/wishlist/types";

export default function WishlistPage() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState<WishlistItemType[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = checkIsAuthenticated();
      setIsAuth(loggedIn);
      setIsLoading(false);

      if (loggedIn) {
        fetchWishlist();
      }
    };

    checkAuth();
  }, []);

  const fetchWishlist = async () => {
    setIsFetching(true);
    try {
      const response = await wishlistService.getWishlist();
      setWishlistItems(response.items || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistItems([]);
    } finally {
      setIsFetching(false);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      await wishlistService.removeFromWishlist(productId);
      setWishlistItems((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await wishlistService.addToCart({ productId, quantity: 1 });
      await wishlistService.removeFromWishlist(productId);
      setWishlistItems((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuth) {
    return <EmptyWishlist />;
  }

  return (
    <div className="min-h-screen bg-background-light">
      <div className="container-fluid py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {isFetching ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : !wishlistItems || wishlistItems.length === 0 ? (
              <EmptyWishlist isAuthenticated={true} />
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-playfair font-bold">
                    My Wishlist{" "}
                    <span className="text-gray-500 font-poppins text-lg">
                      {wishlistItems.length}{" "}
                      {wishlistItems.length === 1 ? "item" : "items"}
                    </span>
                  </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {wishlistItems.map((item) => (
                    <WishlistItem
                      key={item._id}
                      item={item}
                      onRemove={handleRemove}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
