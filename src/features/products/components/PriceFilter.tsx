"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

export const PriceFilter = ({
  minPrice,
  maxPrice,
  onPriceChange,
}: PriceFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  const handleApply = () => {
    onPriceChange(localMin, localMax);
  };

  return (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full mb-3 font-poppins"
      >
        <h3 className="text-sm font-semibold text-gray-900 uppercase">PRICE</h3>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={localMin}
                onChange={(e) => setLocalMin(Number(e.target.value))}
                placeholder="Min"
                className="w-full px-3 py-2 border border-border rounded text-sm font-poppins focus:outline-none focus:border-primary"
              />
            </div>
            <span className="text-gray-400 font-poppins">to</span>
            <div className="flex-1">
              <input
                type="number"
                value={localMax}
                onChange={(e) => setLocalMax(Number(e.target.value))}
                placeholder="Max"
                className="w-full px-3 py-2 border border-border rounded text-sm font-poppins focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="relative pt-2">
            <input
              type="range"
              min="0"
              max="10000"
              value={localMax}
              onChange={(e) => setLocalMax(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <button
            onClick={handleApply}
            className="w-full bg-primary text-white py-2 rounded text-sm font-semibold font-poppins hover:bg-primary/90 transition-colors"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};
