"use client";

import { useState, useEffect } from "react";
import { ProductFilters } from "./ProductFilters";
import { productService } from "../services/product.service";
import { adaptAPIProductToUI } from "../utils/product-adapter";
import { ProductCard } from "@/components/product/ProductCard";
import type {
  Product,
  ProductsListParams,
  ProductsListResponse,
} from "../types";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ProductsListParams>({
    limit: 10,
    page: 1,
  });

  useEffect(() => {
    fetchProducts();
  }, [filters, categoryType]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response: ProductsListResponse =
        await productService.getProductsList({
          ...filters,
          type: categoryType,
        });
      setProducts(response.products);
      setTotalProducts(response.total);
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

  const colorCounts = products.reduce((acc, product) => {
    product.allColors.forEach((color) => {
      acc[color] = (acc[color] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const availableColors = Object.entries(colorCounts).map(([color, count]) => ({
    color,
    count,
  }));

  const availableSizes = Array.from(new Set(products.flatMap((p) => p.allSizes)));

  return (
    <div className="min-h-screen bg-background-light">
      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <div className="container-fluid">
          <h1 className="text-4xl font-playfair font-bold text-center">
            {categoryName}
          </h1>
          <p className="text-center mt-2 font-poppins">
            {totalProducts} items
          </p>
        </div>
      </div>

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
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={adaptAPIProductToUI(product)}
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
