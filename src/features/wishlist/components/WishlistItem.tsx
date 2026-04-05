"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { UIWishlistItem } from "../adapters/wishlist.adapter";

interface WishlistItemProps {
  item: UIWishlistItem;
  onRemove: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

export function WishlistItem({ item, onRemove, onAddToCart }: WishlistItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(item.product._id);
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart(item.product._id);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={handleRemove}
        disabled={isRemoving}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50"
        aria-label="Remove from wishlist"
      >
        <svg
          className="w-4 h-4 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <Link
        href={`/category/sarees`}
        className="block"
      >
        <div className="relative aspect-[4/5] w-full">
          {item.product.discountPercent > 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded font-poppins z-10">
              -{item.product.discountPercent}%
            </div>
          )}
          <Image
            src={item.product.images?.[0] || "/placeholder.jpg"}
            alt={item.product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-3">
        <Link
          href={`/category/sarees `}
        >
          <h3 className="text-sm font-medium text-gray-900 mb-1.5 font-playfair hover:text-gray-700 transition-colors line-clamp-2">
            {item.product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-0.5 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(item.product.averageRating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              } fill-current`}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1 font-poppins">
            ({item.product.totalReviews})
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900 font-poppins">
            ₹{item.product.price.toLocaleString()}
          </span>
          {item.product.oldPrice > item.product.price && (
            <>
              <span className="text-sm text-gray-400 line-through font-poppins">
                ₹{item.product.oldPrice.toLocaleString()}
              </span>
              {item.product.discountPercent > 0 && (
                <span className="text-xs text-red-600 font-semibold font-poppins">
                  ({item.product.discountPercent}% OFF)
                </span>
              )}
            </>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || item.product.availability === "OUT_OF_STOCK"}
          className="w-full bg-primary text-white px-4 py-2 text-sm font-semibold rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
        >
          {isAddingToCart
            ? "Adding..."
            : item.product.availability === "OUT_OF_STOCK"
            ? "Out of Stock"
            : "Move to Cart"}
        </button>
      </div>
    </div>
  );
}
