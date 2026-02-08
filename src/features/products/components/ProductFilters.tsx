"use client";

import { useState } from "react";
import { ProductsListParams } from "../types";

interface ProductFiltersProps {
  onFilterChange: (filters: ProductsListParams) => void;
  availableColors?: string[];
  availableSizes?: string[];
}

export function ProductFilters({
  onFilterChange,
  availableColors = [],
  availableSizes = [],
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<ProductsListParams>({
    limit: 10,
    page: 1,
  });

  const handleFilterChange = (key: keyof ProductsListParams, value: any) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (min?: number, max?: number) => {
    const newFilters = { ...filters, minPrice: min, maxPrice: max, page: 1 };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = { limit: 10, page: 1 };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-playfair font-bold">FILTERS</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-secondary hover:underline font-poppins"
        >
          Clear All
        </button>
      </div>

      {/* Sort */}
      <div className="border-b border-border-light pb-4">
        <h4 className="font-poppins font-semibold mb-3">Sort by</h4>
        <select
          value={filters.sort || ""}
          onChange={(e) =>
            handleFilterChange(
              "sort",
              e.target.value || undefined
            )
          }
          className="w-full p-2 border border-border-light rounded-md font-poppins text-sm"
        >
          <option value="">Recommended</option>
          <option value="newest">What's New</option>
          <option value="popular">Popularity</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="border-b border-border-light pb-4">
        <h4 className="font-poppins font-semibold mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) =>
                handlePriceChange(
                  e.target.value ? Number(e.target.value) : undefined,
                  filters.maxPrice
                )
              }
              className="w-full p-2 border border-border-light rounded-md font-poppins text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                handlePriceChange(
                  filters.minPrice,
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full p-2 border border-border-light rounded-md font-poppins text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Under ₹1000", max: 1000 },
              { label: "₹1000-₹3000", min: 1000, max: 3000 },
              { label: "₹3000-₹5000", min: 3000, max: 5000 },
              { label: "₹5000-₹10000", min: 5000, max: 10000 },
              { label: "Above ₹10000", min: 10000 },
            ].map((range) => (
              <button
                key={range.label}
                onClick={() => handlePriceChange(range.min, range.max)}
                className={`px-3 py-1 text-xs border rounded-full font-poppins transition-colors ${
                  filters.minPrice === range.min &&
                  filters.maxPrice === range.max
                    ? "bg-secondary text-white border-secondary"
                    : "border-border-light hover:border-secondary"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Colors */}
      {availableColors.length > 0 && (
        <div className="border-b border-border-light pb-4">
          <h4 className="font-poppins font-semibold mb-3">Color</h4>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => (
              <button
                key={color}
                onClick={() =>
                  handleFilterChange(
                    "color",
                    filters.color === color ? undefined : color
                  )
                }
                className={`px-3 py-1 text-sm border rounded-md font-poppins transition-colors ${
                  filters.color === color
                    ? "bg-secondary text-white border-secondary"
                    : "border-border-light hover:border-secondary"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {availableSizes.length > 0 && (
        <div className="border-b border-border-light pb-4">
          <h4 className="font-poppins font-semibold mb-3">Size</h4>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() =>
                  handleFilterChange(
                    "size",
                    filters.size === size ? undefined : size
                  )
                }
                className={`px-3 py-1 text-sm border rounded-md font-poppins transition-colors ${
                  filters.size === size
                    ? "bg-secondary text-white border-secondary"
                    : "border-border-light hover:border-secondary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div className="border-b border-border-light pb-4">
        <h4 className="font-poppins font-semibold mb-3">Availability</h4>
        <div className="space-y-2">
          {[
            { label: "In Stock", value: "IN_STOCK" as const },
            { label: "Out of Stock", value: "OUT_OF_STOCK" as const },
            { label: "Pre Order", value: "PRE_ORDER" as const },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="availability"
                checked={filters.availability === option.value}
                onChange={() =>
                  handleFilterChange(
                    "availability",
                    filters.availability === option.value
                      ? undefined
                      : option.value
                  )
                }
                className="w-4 h-4 text-secondary"
              />
              <span className="text-sm font-poppins">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
