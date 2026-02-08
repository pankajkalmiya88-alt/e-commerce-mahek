"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductLabelType } from "@/types/product";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils/cn";
import { wishlistService } from "@/features/wishlist/services/wishlist.service";
import { isAuthenticated } from "@/lib/auth-utils";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  className?: string;
  variant?: 'default' | 'compact';
}

export const ProductCard = ({ product, className, variant = 'default' }: ProductCardProps) => {
  const router = useRouter();
  const productUrl = ROUTES.PRODUCT_DETAIL(product.id);
  const isCompact = variant === 'compact';
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated()) {
      router.push(`/login?referrer=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setIsAddingToWishlist(true);
    try {
      if (isInWishlist) {
        await wishlistService.removeFromWishlist(product.id);
        setIsInWishlist(false);
      } else {
        await wishlistService.addToWishlist({ productId: product.id });
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  return (
    <div className={cn("group w-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow", className)}>
      <div className="relative overflow-hidden">
        <Link href={productUrl}>
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>

        {product.price.discount && product.price.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded font-poppins">
            -{product.price.discount}%
          </div>
        )}

        <button
          onClick={handleWishlistToggle}
          disabled={isAddingToWishlist}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-50 hover:scale-110 transition-all duration-200 cursor-pointer group/heart disabled:opacity-50"
        >
          <svg
            className={cn(
              "w-5 h-5 transition-all duration-200",
              isInWishlist
                ? "text-red-500 fill-red-500"
                : "text-gray-700 group-hover/heart:text-red-500 group-hover/heart:fill-red-500"
            )}
            fill={isInWishlist ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full bg-white text-black px-4 py-3 text-sm font-semibold rounded hover:bg-gray-50 transition-colors shadow-lg font-poppins">
            Add To Cart
          </button>
        </div>
      </div>

      <div className="p-4 text-center bg-white">
        <Link href={productUrl}>
          <h3 className="text-sm font-medium text-gray-900 mb-2 font-playfair hover:text-gray-700 transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-center gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < Math.floor(product.rating?.average || 4) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="text-lg font-bold text-gray-900 font-poppins">
            ₹{product.price.current.toLocaleString()}
          </span>
          {product.price.original && product.price.original > product.price.current && (
            <span className="text-sm text-gray-400 line-through font-poppins">
              ₹{product.price.original.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
