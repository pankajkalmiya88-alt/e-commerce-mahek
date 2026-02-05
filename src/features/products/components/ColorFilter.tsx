"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { COLOR_OPTIONS } from "../constants/filters";

interface ColorFilterProps {
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
}

const COLOR_MAP: Record<string, string> = {
  red: "#FF0000",
  blue: "#0000FF",
  green: "#00FF00",
  yellow: "#FFFF00",
  pink: "#FFC0CB",
  black: "#000000",
  white: "#FFFFFF",
  orange: "#FFA500",
  purple: "#800080",
  brown: "#A52A2A",
  grey: "#808080",
  beige: "#F5F5DC",
};

export const ColorFilter = ({
  selectedColors,
  onColorChange,
}: ColorFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredColors = searchQuery
    ? COLOR_OPTIONS.filter((color) =>
        color.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : COLOR_OPTIONS;

  const handleColorToggle = (colorId: string) => {
    if (selectedColors.includes(colorId)) {
      onColorChange(selectedColors.filter((c) => c !== colorId));
    } else {
      onColorChange([...selectedColors, colorId]);
    }
  };

  return (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full mb-3 font-poppins"
      >
        <h3 className="text-sm font-semibold text-gray-900 uppercase">COLOR</h3>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-border rounded text-sm font-poppins focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-5 gap-2">
            {filteredColors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorToggle(color.id)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColors.includes(color.id)
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: COLOR_MAP[color.id] }}
                title={color.label}
              >
                {color.id === "white" && (
                  <span className="sr-only">{color.label}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
