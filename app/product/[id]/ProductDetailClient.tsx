"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { cartService } from "@/features/cart/services/cart.service";
import { useCartWishlist } from "@/contexts/CartWishlistContext";
import { Product as APIProduct } from "@/features/products/types";

interface ProductDetailClientProps {
  product: Product;
  apiProduct?: APIProduct;
}

export function ProductDetailClient({ product, apiProduct }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const { incrementCartCount } = useCartWishlist();

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      setMessage(null);

      const firstVariant = apiProduct?.variants[0];
      const firstSize = firstVariant?.sizes[0]?.size || "FREE";

      if (!firstVariant) {
        setMessage({ type: "error", text: "Product variant not available." });
        return;
      }

      await cartService.addToCart({
        productId: product.id,
        variantId: firstVariant.variantId,
        size: firstSize,
        quantity,
      });

      incrementCartCount();
      setMessage({ type: "success", text: "Product added to cart successfully!" });
      
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setMessage({ type: "error", text: "Failed to add product to cart. Please try again." });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={decrementQuantity}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-poppins font-semibold"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-6 py-2 border-x border-gray-300 font-poppins font-medium">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-poppins font-semibold"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg font-poppins text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-poppins font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </button>
        <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-poppins font-semibold hover:bg-primary/10 transition-colors">
          Buy Now
        </button>
      </div>
      
      {product.description && (
        <div className="pt-4 border-t">
          <p className="text-gray-600 font-poppins text-sm leading-relaxed">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
}
