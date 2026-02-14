"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import type { CartItem as CartItemType } from "../services/cart.service";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (variantId: string, size: string, quantity: number) => void;
  onRemove: (variantId: string, size: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const productUrl = ROUTES.PRODUCT_DETAIL(item.product._id);
  const productImage = item.product.allImages && item.product.allImages.length > 0
    ? item.product.allImages[0]
    : "/images/placeholder.jpg";

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    try {
      await onUpdateQuantity(item.variantId, item.size, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(item.variantId, item.size);
    } finally {
      setIsRemoving(false);
    }
  };

  const subtotal = item.price * item.quantity;
  const colorName = item.color.charAt(0).toUpperCase() + item.color.slice(1);

  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm ${isRemoving ? "opacity-50" : ""}`}>
      <div className="flex gap-4">
        {/* Product Image */}
        <Link href={productUrl} className="flex-shrink-0">
          <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
            <Image
              src={productImage}
              alt={item.product.name}
              fill
              className="object-cover"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <Link href={productUrl}>
            <h3 className="font-poppins font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2">
              {item.product.name}
            </h3>
          </Link>

          <div className="mt-1 space-y-1">
            <p className="text-sm text-gray-600 font-poppins">
              <span className="font-medium">Color:</span> {colorName}
            </p>
            <p className="text-sm text-gray-600 font-poppins">
              <span className="font-medium">Size:</span> {item.size}
            </p>
            <p className="text-lg font-bold text-gray-900 font-poppins">
              ₹{item.price.toLocaleString()}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={isUpdating || item.quantity <= 1}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
              >
                −
              </button>
              <span className="px-4 py-1 border-x border-gray-300 font-poppins font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
              >
                +
              </button>
            </div>

            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="text-sm text-red-600 hover:text-red-700 font-poppins font-medium disabled:opacity-50"
            >
              {isRemoving ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="flex-shrink-0 text-right">
          <p className="text-lg font-bold text-gray-900 font-poppins">
            ₹{subtotal.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
