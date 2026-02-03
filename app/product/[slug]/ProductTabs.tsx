"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { ReviewsSection } from "@/components/product/ReviewsSection";

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  return (
    <div className="mt-12 lg:mt-16">
      {product.deliveryInfo?.peopleViewing && (
        <div className="flex items-center justify-center gap-2 text-sm font-poppins mb-6 pb-6 border-b border-gray-200">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-gray-700">
            <strong>{product.deliveryInfo.peopleViewing}</strong> People are Looking for this Product
          </span>
        </div>
      )}

      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-4 border-b-2 font-semibold font-poppins transition-colors ${
              activeTab === "description"
                ? "border-primary text-gray-900"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 border-b-2 font-semibold font-poppins transition-colors ${
              activeTab === "reviews"
                ? "border-primary text-gray-900"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Reviews
          </button>
        </div>
      </div>

      {activeTab === "description" ? (
        <div className="max-w-4xl">
          <p className="text-gray-700 leading-relaxed mb-6 font-poppins">
            {product.description || product.shortDescription}
          </p>

          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-playfair">FEATURES</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 font-poppins">
                    <span className="text-primary mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.washingInstructions && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-playfair">WASHING MACHINE</h3>
              <ul className="space-y-2 text-gray-700 font-poppins">
                {product.washingInstructions.embroideredSuits && (
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>All Silk suits - Dry clean Only</span>
                  </li>
                )}
                {product.washingInstructions.printedCotton && (
                  <>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Embroidery suits - Dry clean Only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Printed Cotton - Gentle dip wash with mild Detergent</span>
                    </li>
                  </>
                )}
              </ul>
              {product.washingInstructions.disclaimer && (
                <p className="mt-4 text-sm text-gray-600 font-poppins">
                  <strong>DISCLAIMER:</strong> {product.washingInstructions.disclaimer}
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <ReviewsSection
          reviews={product.reviews || []}
          averageRating={product.rating?.average || 0}
          totalReviews={product.rating?.count || 0}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1 font-poppins">Free Shipping</h4>
            <p className="text-sm text-gray-600 font-poppins">Free shipping on all orders</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1 font-poppins">No Exchange</h4>
            <p className="text-sm text-gray-600 font-poppins">No Exchange / No Return</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1 font-poppins">Secure Payment</h4>
            <p className="text-sm text-gray-600 font-poppins">100% secure payment</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1 font-poppins">Worldwide Shipping</h4>
            <p className="text-sm text-gray-600 font-poppins">We ship worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
};
