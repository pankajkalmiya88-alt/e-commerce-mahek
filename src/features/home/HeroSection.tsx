import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[450px] md:h-[480px] lg:h-[530px]">
      <Image
        src="/images/top-slider.png"
        alt="Bright Look for Special Moments"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute" />
      
      <div className="relative h-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 h-full flex items-center">
          <div className="max-w-xl w-full">
          <p className="text-white text-[10px] md:text-xs tracking-[0.15em] mb-2 md:mb-3 font-poppins font-medium">
            CELEBRATE IN STYLE
          </p>
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight md:leading-[1.2] mb-3 md:mb-4 font-playfair">
            Bright Look for<br />
            Special Moments
          </h1>
          <p className="text-white/95 text-xs sm:text-sm md:text-base mb-4 md:mb-6 font-poppins font-light">
            The Perfect Indian Collection Designer Wear
          </p>
          <Link 
            href={ROUTES.SHOP}
            className="inline-block bg-white text-black px-6 md:px-6 py-2.5 md:py-2.5 text-xs md:text-sm font-semibold tracking-wide hover:bg-gray-100 transition-colors font-poppins rounded-sm"
          >
            SHOP NOW
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
