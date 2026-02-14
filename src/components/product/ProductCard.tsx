"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductLabelType } from "@/types/product";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils/cn";
import { wishlistService } from "@/features/wishlist/services/wishlist.service";
import { cartService } from "@/features/cart/services/cart.service";
import { isAuthenticated } from "@/lib/auth-utils";
import { useRouter } from "next/navigation";
import { useCartWishlist } from "@/contexts/CartWishlistContext";

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
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { incrementCartCount, incrementWishlistCount, decrementWishlistCount } = useCartWishlist();

  useEffect(() => {
    if (isHovering && product.images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentImageIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, product.images.length]);

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
        decrementWishlistCount();
      } else {
        await wishlistService.addToWishlist({ productId: product.id });
        setIsInWishlist(true);
        incrementWishlistCount();
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated()) {
      router.push(`/login?referrer=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setIsAddingToCart(true);
    try {
      const defaultSize = product.sizes && product.sizes.length > 0 
        ? product.sizes[0].name 
        : "FREE";
      
      await cartService.addToCart({
        productId: product.id,
        variantId: `${product.id}_variant_1`,
        size: defaultSize,
        quantity: 1,
      });
      incrementCartCount();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className={cn("group w-full bg-white overflow-hidden transition-shadow", className)}>
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Link href={productUrl}>
          <div className="relative aspect-[3/4] w-full bg-gray-100">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[currentImageIndex].url}
                alt={product.images[currentImageIndex].alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-opacity duration-300"
                priority={currentImageIndex === 0}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
          </div>
        </Link>

        {product.label?.type === ProductLabelType.NEW && (
          <div className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 uppercase font-poppins" style={{ backgroundColor: '#C1272D' }}>
            NEW
          </div>
        )}

        {product.label?.type === ProductLabelType.SALE && (
          <div className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 uppercase font-poppins" style={{ backgroundColor: '#C1272D' }}>
            SALE
          </div>
        )}

        {product.rating && product.rating.average > 0 && (
          <div className="absolute top-2 left-2 bg-white rounded px-2 py-1 shadow-sm flex items-center gap-1">
            <span className="text-xs font-semibold font-poppins">{product.rating.average.toFixed(1)}</span>
            <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-xs text-gray-400 font-poppins">| {product.rating.count}</span>
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

        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  index === currentImageIndex ? "bg-gray-300" : "bg-gray-300"
                )}
                style={index === currentImageIndex ? { backgroundColor: '#C1272D' } : {}}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-3">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full border border-gray-300 rounded px-4 py-2 text-sm font-semibold font-poppins transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          style={{
            borderColor: isAddingToCart ? '#C1272D' : undefined,
            color: isAddingToCart ? '#C1272D' : undefined,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#C1272D';
            e.currentTarget.style.color = '#C1272D';
          }}
          onMouseLeave={(e) => {
            if (!isAddingToCart) {
              e.currentTarget.style.borderColor = '';
              e.currentTarget.style.color = '';
            }
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {isAddingToCart ? "ADDING..." : "ADD TO CART"}
        </button>

        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-2 text-xs text-gray-600 font-poppins">
            Sizes: {product.sizes.slice(0, 3).map(s => s.name).join(", ")}{product.sizes.length > 3 ? "..." : ""}
          </div>
        )}

        <Link href={productUrl}>
          <h3 className="text-sm font-medium text-gray-900 mt-3 mb-2 font-poppins hover:text-gray-700 transition-colors line-clamp-2 uppercase">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-gray-500 font-poppins line-clamp-1 mb-2">
          {product.shortDescription || product.category}
        </p>

        <div className="flex items-baseline gap-2">
          {product.price?.current !== undefined ? (
            <>
              <span className="text-lg font-bold text-gray-900 font-poppins">
                Rs. {product.price.current.toLocaleString()}
              </span>
              {product.price.original && product.price.original > product.price.current && (
                <>
                  <span className="text-sm text-gray-400 line-through font-poppins">
                    Rs. {product.price.original.toLocaleString()}
                  </span>
                  <span className="text-sm text-orange-500 font-semibold font-poppins">
                    ({product.price.discount}% OFF)
                  </span>
                </>
              )}
            </>
          ) : (
            <span className="text-sm text-gray-500 font-poppins">Price not available</span>
          )}
        </div>
      </div>
    </div>
  );
};
