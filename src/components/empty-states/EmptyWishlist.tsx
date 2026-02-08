"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildLoginUrl } from "@/lib/auth-utils";

interface EmptyWishlistProps {
  isAuthenticated?: boolean;
}

export function EmptyWishlist({ isAuthenticated = false }: EmptyWishlistProps) {
  const pathname = usePathname();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <svg
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <rect
                  x="30"
                  y="40"
                  width="60"
                  height="70"
                  rx="4"
                  stroke="#FFB6C1"
                  strokeWidth="3"
                  fill="#FFF0F5"
                />
                <path
                  d="M45 40V35C45 27.268 51.268 21 59 21H61C68.732 21 75 27.268 75 35V40"
                  stroke="#FFB6C1"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M50 60L55 65L70 50"
                  stroke="#FF69B4"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-playfair font-bold text-primary mb-3">
            PLEASE LOG IN
          </h1>
          
          <p className="text-base font-poppins text-text-secondary mb-8">
            Login to view items in your wishlist.
          </p>

          <Link
            href={buildLoginUrl(pathname)}
            className="inline-block px-8 py-3 bg-white text-secondary border-2 border-secondary rounded-lg font-poppins font-semibold text-base hover:bg-secondary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            LOGIN
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-light p-8 text-center">
      <div className="mb-6">
        <div className="w-24 h-24 mx-auto mb-4 relative">
          <svg
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <rect
              x="30"
              y="40"
              width="60"
              height="70"
              rx="4"
              stroke="#FFB6C1"
              strokeWidth="3"
              fill="#FFF0F5"
            />
            <path
              d="M45 40V35C45 27.268 51.268 21 59 21H61C68.732 21 75 27.268 75 35V40"
              stroke="#FFB6C1"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="60" cy="70" r="3" fill="#FF69B4" />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-playfair font-bold text-primary mb-2">
        Your Wishlist is Empty
      </h2>
      
      <p className="text-sm font-poppins text-text-secondary mb-6">
        Add items you love to your wishlist. Review them anytime and easily move them to the bag.
      </p>

      <Link
        href="/"
        className="inline-block px-6 py-2.5 bg-gradient-to-r from-secondary to-primary text-white rounded-lg font-poppins font-semibold text-sm hover:shadow-lg transition-all duration-300"
      >
        START SHOPPING
      </Link>
    </div>
  );
}
