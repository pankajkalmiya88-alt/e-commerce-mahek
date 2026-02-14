"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductFilters } from "./ProductFilters";
import { productService } from "../services/product.service";
import { expandProductVariants } from "../utils/variant-expander";
import { adaptExpandedVariantToUI } from "../utils/variant-product-adapter";
import { ProductCard } from "@/components/product/ProductCard";
import type {
  Product,
  ProductsListParams,
  ProductsListResponse,
} from "../types";
import type { ExpandedVariantProduct } from "../utils/variant-expander";

interface CategoryPageContentProps {
  categorySlug: string;
  categoryName: string;
  categoryType: string;
}

export function CategoryPageContent({
  categorySlug,
  categoryName,
  categoryType,
}: CategoryPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [expandedVariants, setExpandedVariants] = useState<ExpandedVariantProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize filters from URL query params
  const getInitialFilters = (): ProductsListParams => {
    const params: ProductsListParams = {
      limit: 10,
      page: 1,
    };

    if (searchParams.get('page')) {
      params.page = parseInt(searchParams.get('page')!);
    }
    if (searchParams.get('limit')) {
      params.limit = parseInt(searchParams.get('limit')!);
    }
    if (searchParams.get('sort')) {
      params.sort = searchParams.get('sort') as any;
    }
    if (searchParams.get('minPrice')) {
      params.minPrice = parseInt(searchParams.get('minPrice')!);
    }
    if (searchParams.get('maxPrice')) {
      params.maxPrice = parseInt(searchParams.get('maxPrice')!);
    }
    if (searchParams.get('color')) {
      params.color = searchParams.get('color')!;
    }
    if (searchParams.get('size')) {
      params.size = searchParams.get('size')!;
    }
    if (searchParams.get('availability')) {
      params.availability = searchParams.get('availability') as any;
    }

    return params;
  };

  const [filters, setFilters] = useState<ProductsListParams>(getInitialFilters);

  // Initialize filters from URL on mount
  useEffect(() => {
    setFilters(getInitialFilters());
    setIsInitialized(true);
  }, []);

  // Fetch products when filters or category changes
  useEffect(() => {
    if (isInitialized) {
      fetchProducts();
    }
  }, [filters, categoryType, isInitialized]);

  // Sync filters to URL query params
  useEffect(() => {
    if (!isInitialized) return;

    const params = new URLSearchParams();

    if (filters.page && filters.page !== 1) {
      params.set('page', filters.page.toString());
    }
    if (filters.limit && filters.limit !== 10) {
      params.set('limit', filters.limit.toString());
    }
    if (filters.sort) {
      params.set('sort', filters.sort);
    }
    if (filters.minPrice) {
      params.set('minPrice', filters.minPrice.toString());
    }
    if (filters.maxPrice) {
      params.set('maxPrice', filters.maxPrice.toString());
    }
    if (filters.color) {
      params.set('color', filters.color);
    }
    if (filters.size) {
      params.set('size', filters.size);
    }
    if (filters.availability) {
      params.set('availability', filters.availability);
    }

    const queryString = params.toString();
    const newUrl = queryString 
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;
    
    router.replace(newUrl, { scroll: false });
  }, [filters, isInitialized, router]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response: ProductsListResponse =
        await productService.getProductsList({
          ...filters,
          type: categoryType,
        });
      
      // Expand products into variants (each variant becomes a separate card)
      const allExpandedVariants = response.products.flatMap((product) =>
        expandProductVariants(product)
      );
      
      setProducts(response.products);
      setExpandedVariants(allExpandedVariants);
      setTotalProducts(allExpandedVariants.length);
      setCurrentPage(response.page);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: ProductsListParams) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  // Calculate color counts from expanded variants (each variant = 1 color)
  const colorCounts = expandedVariants.reduce((acc, variant) => {
    const color = variant.selectedVariant.color;
    acc[color] = (acc[color] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const availableColors = Object.entries(colorCounts).map(([color, count]) => ({
    color,
    count,
  }));

  // Calculate available sizes from expanded variants
  const availableSizes = Array.from(
    new Set(expandedVariants.flatMap((v) => v.selectedVariant.sizes.map(s => s.size)))
  );

  return (
    <div className="min-h-screen bg-background-light">
      {/* Main Content */}
      <div className="container-fluid py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <ProductFilters
                onFilterChange={handleFilterChange}
                availableColors={availableColors}
                availableSizes={availableSizes}
                initialFilters={filters}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl font-poppins text-text-secondary">
                  No products found matching your filters
                </p>
              </div>
            ) : (
              <>
                {/* Products Grid - Variant-wise display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {expandedVariants.map((expandedVariant) => (
                    <ProductCard
                      key={`${expandedVariant._id}-${expandedVariant.selectedVariantId}`}
                      product={adaptExpandedVariantToUI(expandedVariant)}
                      apiProduct={expandedVariant}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalProducts > (filters.limit || 10) && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-border-light rounded-md font-poppins disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-light"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 font-poppins">
                      Page {currentPage} of{" "}
                      {Math.ceil(totalProducts / (filters.limit || 10))}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={
                        currentPage >=
                        Math.ceil(totalProducts / (filters.limit || 10))
                      }
                      className="px-4 py-2 border border-border-light rounded-md font-poppins disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-light"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
