"use client";

import { Product } from "@/types/product";
import { FilterSidebar } from "./FilterSidebar";
import { MobileFilterToggle } from "./MobileFilterToggle";
import { SortDropdown } from "./SortDropdown";
import { ProductsGrid } from "./ProductsGrid";
import { Pagination } from "./Pagination";
import { useProductFilters } from "../hooks/useProductFilters";
import { SortOption } from "../types/filters";

interface ProductsPageContentProps {
  products: Product[];
}

export const ProductsPageContent = ({
  products,
}: ProductsPageContentProps) => {
  const {
    filters,
    setFilters,
    currentPage,
    totalPages,
    paginatedProducts,
    totalProducts,
    handlePageChange,
  } = useProductFilters(products);

  return (
    <div className="min-h-screen bg-background-gray">
      <div className="bg-primary text-white py-8 md:py-12">
        <div className="container-fluid">
          <h1 className="text-2xl md:text-4xl font-playfair font-semibold text-center">
            Kurtis For Women
          </h1>
          <p className="text-center text-white/90 mt-2 text-sm md:text-base font-poppins">
            {totalProducts.toLocaleString()} items
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} onFilterChange={setFilters} />
        </div>

        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 md:gap-4 overflow-x-auto">
                <MobileFilterToggle
                  filters={filters}
                  onFilterChange={setFilters}
                />
                <button className="text-xs md:text-sm font-poppins px-3 md:px-4 py-2 border border-border rounded hover:bg-gray-50 transition-colors whitespace-nowrap">
                  Bundles
                </button>
                <button className="text-xs md:text-sm font-poppins px-3 md:px-4 py-2 border border-border rounded hover:bg-gray-50 transition-colors whitespace-nowrap">
                  Country of Origin
                </button>
                <button className="text-xs md:text-sm font-poppins px-3 md:px-4 py-2 border border-border rounded hover:bg-gray-50 transition-colors whitespace-nowrap">
                  Size
                </button>
              </div>

              <SortDropdown
                selectedSort={filters.sortBy}
                onSortChange={(sort: SortOption) =>
                  setFilters({ ...filters, sortBy: sort })
                }
              />
            </div>
          </div>

          <ProductsGrid products={paginatedProducts} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};
