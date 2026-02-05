"use client";

import { FilterSection } from "./FilterSection";
import { PriceFilter } from "./PriceFilter";
import { ColorFilter } from "./ColorFilter";
import {
  CATEGORY_OPTIONS,
  BRAND_OPTIONS,
  SIZE_OPTIONS,
  BUNDLE_OPTIONS,
  COUNTRY_OPTIONS,
  DEFAULT_PRICE_RANGE,
} from "../constants/filters";
import { FilterState } from "../types/filters";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const FilterSidebar = ({
  filters,
  onFilterChange,
}: FilterSidebarProps) => {
  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="w-64 bg-white border-r border-border h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 font-poppins">
            FILTERS
          </h2>
          <button
            onClick={() =>
              onFilterChange({
                categories: [],
                brands: [],
                priceRange: DEFAULT_PRICE_RANGE,
                colors: [],
                sizes: [],
                bundles: [],
                countryOfOrigin: [],
                sortBy: filters.sortBy,
              })
            }
            className="text-sm text-primary font-semibold font-poppins hover:underline"
          >
            Clear All
          </button>
        </div>

        <FilterSection
          title="CATEGORIES"
          options={CATEGORY_OPTIONS}
          selectedValues={filters.categories}
          onSelectionChange={(values) => updateFilter("categories", values)}
          showCount={true}
        />

        <FilterSection
          title="BRAND"
          options={BRAND_OPTIONS}
          selectedValues={filters.brands}
          onSelectionChange={(values) => updateFilter("brands", values)}
          searchable={true}
          showCount={true}
        />

        <PriceFilter
          minPrice={filters.priceRange.min}
          maxPrice={filters.priceRange.max}
          onPriceChange={(min, max) =>
            updateFilter("priceRange", { min, max })
          }
        />

        <ColorFilter
          selectedColors={filters.colors}
          onColorChange={(colors) => updateFilter("colors", colors)}
        />

        <FilterSection
          title="DISCOUNT RANGE"
          options={BUNDLE_OPTIONS}
          selectedValues={filters.bundles}
          onSelectionChange={(values) => updateFilter("bundles", values)}
        />

        <FilterSection
          title="SIZE"
          options={SIZE_OPTIONS}
          selectedValues={filters.sizes}
          onSelectionChange={(values) => updateFilter("sizes", values)}
          maxVisible={10}
        />

        <FilterSection
          title="COUNTRY OF ORIGIN"
          options={COUNTRY_OPTIONS}
          selectedValues={filters.countryOfOrigin}
          onSelectionChange={(values) =>
            updateFilter("countryOfOrigin", values)
          }
        />
      </div>
    </div>
  );
};
