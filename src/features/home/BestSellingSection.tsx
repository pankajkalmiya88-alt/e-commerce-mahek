"use client";

import { ProductCarousel } from "@/components/product/ProductCarousel";
import { MOCK_PRODUCTS } from "@/data/mock-products";

export const BestSellingSection = () => {
  const bestSellingProducts = MOCK_PRODUCTS.filter(
    (product) => product.bestseller
  );

  return (
    <section className="py-8 md:py-10 lg:py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-6 md:mb-8 lg:mb-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 font-playfair tracking-tight">
            Best Selling
          </h2>
        </div>

        <ProductCarousel products={bestSellingProducts} slidesToShow={5} />
      </div>
    </section>
  );
};
