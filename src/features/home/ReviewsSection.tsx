"use client";

import { useState } from "react";
import Link from "next/link";
import { ReviewCard } from "@/components/review/ReviewCard";
import { MOCK_REVIEWS } from "@/data/mock-reviews";

export const ReviewsSection = () => {
  const [reviewIndex, setReviewIndex] = useState(0);

  const slideReviewLeft = () => {
    if (reviewIndex > 0) {
      setReviewIndex(reviewIndex - 1);
    }
  };

  const slideReviewRight = () => {
    if (reviewIndex < MOCK_REVIEWS.length - 3) {
      setReviewIndex(reviewIndex + 1);
    }
  };

  return (
    <section className="py-10 md:py-14 lg:py-18 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-playfair tracking-tight">
            REVIEWS AND RATINGS
          </h2>
          <Link
            href="#"
            className="text-xs md:text-sm font-medium text-gray-700 hover:text-black transition-colors underline font-poppins"
          >
            View All
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={slideReviewLeft}
            disabled={reviewIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white rounded-full p-3 shadow-xl hover:bg-gray-50 hover:shadow-2xl disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-gray-100"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={slideReviewRight}
            disabled={reviewIndex >= MOCK_REVIEWS.length - 3}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white rounded-full p-3 shadow-xl hover:bg-gray-50 hover:shadow-2xl disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-gray-100"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="overflow-hidden">
            <div
              className="flex gap-4 md:gap-6 transition-all duration-500 py-4"
              style={{ transform: `translateX(-${reviewIndex * 33.33}%)` }}
            >
              {MOCK_REVIEWS.map((review) => (
                <div key={review.id} className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
