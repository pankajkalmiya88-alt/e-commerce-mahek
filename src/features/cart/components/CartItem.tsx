"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
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
  const productImage = item.images?.[0] || item.product.allImages?.[0] || "/placeholder.jpg";

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
    <div className={`bg-white rounded-lg p-6 shadow-sm border border-gray-200 ${isRemoving ? "opacity-50" : ""}`}>
      <div className="flex gap-6">
        {/* Product Image */}
        <Link href={productUrl} className="flex-shrink-0">
          <div className="relative w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
            <Image
              src={productImage}
              alt={item.product.name}
              fill
              sizes="128px"
              className="object-cover object-top"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <Link href={productUrl}>
            <h3 
              className="font-playfair font-medium text-base text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-2"
              data-tooltip-id={`product-name-${item.variantId}-${item.size}`}
              data-tooltip-content={item.product.name}
            >
              {item.product.name}
            </h3>
          </Link>
          <Tooltip 
            id={`product-name-${item.variantId}-${item.size}`}
            place="top"
            className="!bg-gray-900 !text-white !text-sm !px-3 !py-2 !rounded !z-50"
          />

          <div className="space-y-1.5">
            <p className="text-sm text-gray-600 font-poppins">
              Color: <span className="font-medium">{colorName}</span>
            </p>
            <p className="text-sm text-gray-600 font-poppins">
              Size: <span className="font-medium">{item.size}</span>
            </p>
            <p className="text-xl font-bold text-gray-900 font-poppins mt-2">
              ₹{item.price.toLocaleString()}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={isUpdating || item.quantity <= 1}
                className="px-3 py-1.5 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-poppins text-lg"
              >
                −
              </button>
              <span className="px-4 py-1.5 border-x border-gray-300 font-poppins font-medium min-w-[3rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
                className="px-3 py-1.5 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-poppins text-lg"
              >
                +
              </button>
            </div>

            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="text-sm text-red-600 hover:text-red-700 font-poppins disabled:opacity-50"
            >
              {isRemoving ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>

        {/* Subtotal - Hidden on mobile, shown on desktop */}
        <div className="hidden md:block flex-shrink-0 text-right ml-auto">
          <p className="text-xl font-bold text-gray-900 font-poppins">
            ₹{subtotal.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
