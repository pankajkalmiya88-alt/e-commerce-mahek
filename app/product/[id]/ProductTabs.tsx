"use client";

import { Product } from "@/types/product";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <div className="mt-12">
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          <button className="pb-4 border-b-2 border-primary text-primary font-poppins font-semibold">
            Description
          </button>
          <button className="pb-4 border-b-2 border-transparent text-gray-600 font-poppins hover:text-primary">
            Reviews ({product.rating?.count || 0})
          </button>
        </div>
      </div>
      
      <div className="py-8">
        <div className="prose max-w-none">
          <p className="text-gray-600 font-poppins leading-relaxed">
            {product.description || "No description available."}
          </p>
          
          {product.features && product.features.length > 0 && (
            <div className="mt-6">
              <h3 className="font-playfair font-semibold text-lg mb-3">Features</h3>
              <ul className="list-disc list-inside space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 font-poppins">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {product.washingInstructions && (
            <div className="mt-6">
              <h3 className="font-playfair font-semibold text-lg mb-3">Care Instructions</h3>
              <p className="text-gray-600 font-poppins">
                {product.washingInstructions.disclaimer || "Handle with care."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
