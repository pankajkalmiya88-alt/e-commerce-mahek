"use client";

import { useState } from "react";
import { FilterOption, SizeOption } from "../types/filters";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface FilterSectionProps {
  title: string;
  options: FilterOption[] | SizeOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  searchable?: boolean;
  showCount?: boolean;
  maxVisible?: number;
}

export const FilterSection = ({
  title,
  options,
  selectedValues,
  onSelectionChange,
  searchable = false,
  showCount = false,
  maxVisible = 5,
}: FilterSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = searchQuery
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const visibleOptions = showAll
    ? filteredOptions
    : filteredOptions.slice(0, maxVisible);

  const handleCheckboxChange = (id: string) => {
    if (selectedValues.includes(id)) {
      onSelectionChange(selectedValues.filter((v) => v !== id));
    } else {
      onSelectionChange([...selectedValues, id]);
    }
  };

  return (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full mb-3 font-poppins"
      >
        <h3 className="text-sm font-semibold text-gray-900 uppercase">
          {title}
        </h3>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-2">
          {searchable && (
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-border rounded text-sm font-poppins focus:outline-none focus:border-primary"
              />
            </div>
          )}

          {visibleOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <span className="text-sm text-gray-700 font-poppins group-hover:text-gray-900 flex-1">
                {option.label}
              </span>
              {showCount && "count" in option && option.count ? (
                <span className="text-xs text-gray-400 font-poppins">
                  ({option.count.toLocaleString()})
                </span>
              ) : null}
            </label>
          ))}

          {filteredOptions.length > maxVisible && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-primary font-semibold font-poppins hover:underline mt-2"
            >
              {showAll
                ? "- Show Less"
                : `+ ${filteredOptions.length - maxVisible} more`}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
