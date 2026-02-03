import Image from "next/image";
import Link from "next/link";
import { Product, ProductLabelType } from "@/types/product";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils/cn";

interface ProductCardProps {
  product: Product;
  className?: string;
  variant?: 'default' | 'compact';
}

export const ProductCard = ({ product, className, variant = 'default' }: ProductCardProps) => {
  const productUrl = ROUTES.PRODUCT_DETAIL(product.slug);
  const isCompact = variant === 'compact';

  return (
    <div className={cn(isCompact ? "group w-full rounded-lg overflow-hidden cursor-pointer" : "group w-full rounded-lg overflow-hidden cursor-pointer", className)}>
      <div className="relative overflow-hidden rounded-t-lg">
        <Link href={productUrl}>
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            width={isCompact ? 160 : 208}
            height={isCompact ? 200 : 256}
            className={isCompact ? "h-48 sm:h-52 w-full object-cover group-hover:scale-110 transition-transform duration-500" : "h-56 sm:h-64 w-full object-cover group-hover:scale-110 transition-transform duration-500"}
          />
        </Link>

        {product.label?.type === ProductLabelType.PRE_ORDER ? (
          <div className="absolute top-2 left-2 bg-cyan-500 text-white text-xs px-2.5 py-1.5 rounded font-semibold">
            {product.label.text}
          </div>
        ) : (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
            {product.price.discount ? `-${product.price.discount}%` : '-10%'}
          </div>
        )}

        <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors cursor-pointer">
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full bg-white text-black px-4 py-2.5 text-sm font-semibold rounded hover:bg-gray-100 transition-colors shadow-lg font-poppins">
            Add To Cart
          </button>
        </div>
      </div>

      <div className={isCompact ? "p-2 sm:p-3 text-center" : "p-3 sm:p-4 text-center"}>
        <Link href={productUrl}>
          <h3 className={isCompact ? "text-xs sm:text-sm font-medium text-gray-800 mb-1 font-poppins hover:text-gray-600 transition-colors line-clamp-2" : "text-sm font-medium text-gray-800 mb-1 font-poppins hover:text-gray-600 transition-colors line-clamp-2"}>{product.name}</h3>
        </Link>

        <div className={isCompact ? "flex items-center justify-center gap-0.5 mb-1.5" : "flex items-center justify-center gap-0.5 mb-2"}>
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={isCompact ? `w-3 h-3 ${i < (product.rating?.average || 4) ? 'text-yellow-400' : 'text-gray-300'} fill-current` : `w-4 h-4 ${i < (product.rating?.average || 4) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className={isCompact ? "text-sm text-black font-semibold font-poppins" : "text-black font-semibold font-poppins"}>₹{product.price.current.toLocaleString()}</span>
          {product.price.original && (
            <span className={isCompact ? "text-gray-400 line-through text-xs font-poppins" : "text-gray-400 line-through text-sm font-poppins"}>₹{product.price.original.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};
