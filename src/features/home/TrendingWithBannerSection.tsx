"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { ROUTES } from "@/constants/routes";

interface TrendingWithBannerSectionProps {
  bannerPosition?: 'left' | 'right';
  title?: string;
}

export const TrendingWithBannerSection = ({ bannerPosition = 'right', title = 'Top Trending Collection' }: TrendingWithBannerSectionProps) => {
  const trendingProducts = MOCK_PRODUCTS.filter((product) => product.trending).slice(0, 4);

  return (
    <section className="py-8 md:py-10 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 items-start ${bannerPosition === 'left' ? 'lg:flex-row-reverse' : ''}`}>
          <div className={bannerPosition === 'left' ? 'lg:col-span-2 order-first lg:order-last' : 'lg:col-span-2'}>
            <div className="relative h-[280px] md:h-[300px] lg:h-full min-h-[420px] rounded-lg overflow-hidden">
              <Image
                src={`/images/${bannerPosition === 'left' ? 'rightbgimg.png' : 'top-trandig-right-banner.png' }`}
                alt="Modern Shehzadi"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 font-playfair tracking-tight">{title}</h2>
              <Link href={ROUTES.SHOP} className="text-xs md:text-sm font-semibold text-primary hover:text-primary/80 transition-colors font-poppins whitespace-nowrap">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
