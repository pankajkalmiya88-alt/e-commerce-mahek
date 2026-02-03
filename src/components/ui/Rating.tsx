import { cn } from "@/lib/utils/cn";

interface RatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
  showCount?: boolean;
  count?: number;
}

export const Rating = ({
  rating,
  maxRating = 5,
  className,
  showCount = false,
  count,
}: RatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < fullStars;
          const isHalf = index === fullStars && hasHalfStar;

          return (
            <span
              key={index}
              className={cn(
                "text-base",
                isFilled ? "text-yellow-400" : isHalf ? "text-yellow-400" : "text-gray-300"
              )}
            >
              {isFilled || isHalf ? "★" : "☆"}
            </span>
          );
        })}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-text-muted">({count})</span>
      )}
    </div>
  );
};
