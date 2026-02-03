"use client";

import { ButtonHTMLAttributes } from "react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary";
}

export const AuthButton = ({
  children,
  isLoading = false,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: AuthButtonProps) => {
  const baseStyles =
    "w-full py-4 px-6 rounded-lg font-inter font-semibold text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 focus:ring-4 focus:ring-secondary/20 focus:outline-none",
    secondary:
      "bg-white text-primary border-2 border-primary hover:bg-background-gray focus:ring-4 focus:ring-primary/20 focus:outline-none",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
