"use client";

import { Product } from "@/types/product";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-poppins font-semibold hover:bg-primary/90 transition-colors">
          Add to Cart
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
