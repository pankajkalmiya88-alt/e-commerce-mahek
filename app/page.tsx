import { HeroSection } from "@/features/home/HeroSection";
import { CategorySection } from "@/features/home/CategorySection";
import { BestSellingSection } from "@/features/home/BestSellingSection";
import { TrendingWithBannerSection } from "@/features/home/TrendingWithBannerSection";
import { PremiumRetailsSection } from "@/features/home/PremiumRetailsSection";
import { FlashSaleSection } from "@/features/home/FlashSaleSection";
import { GallerySection } from "@/features/home/GallerySection";
import { ReviewsSection } from "@/features/home/ReviewsSection";
import { FeaturesSection } from "@/features/home/FeaturesSection";
import { InfoNotice } from "@/features/home/InfoNotice";
import { MarqueeBar } from "@/components/layout/MarqueeBar";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <MarqueeBar />
      <BestSellingSection />
      <TrendingWithBannerSection bannerPosition="right" title="Top Trending Collection 1" />
      <FlashSaleSection />
      <TrendingWithBannerSection bannerPosition="left" title="Top Trending Collection 2" />
      <PremiumRetailsSection />
      <GallerySection />
      <ReviewsSection />
      <FeaturesSection />
      <InfoNotice />
    </>
  );
}
