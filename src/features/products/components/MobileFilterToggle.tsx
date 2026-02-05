"use client";

import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";
import { FilterState } from "../types/filters";

interface MobileFilterToggleProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const MobileFilterToggle = ({
  filters,
  onFilterChange,
}: MobileFilterToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded bg-white hover:bg-gray-50 transition-colors font-poppins"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="text-sm font-semibold">Filters</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-semibold font-poppins">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterSidebar filters={filters} onFilterChange={onFilterChange} />

            <div className="sticky bottom-0 bg-white border-t border-border p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-primary text-white py-3 rounded font-semibold font-poppins hover:bg-primary/90 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
