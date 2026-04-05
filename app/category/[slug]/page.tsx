import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/constants/categories";
import { CATEGORY_TYPE_MAP } from "@/features/products/types";
import { CategoryPageContent } from "@/features/products/components/CategoryPageContent";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((cat) => cat.slug === slug);
  const categoryType = CATEGORY_TYPE_MAP[slug];

  if (!category || !categoryType) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background-light">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }
    >
      <CategoryPageContent
        categorySlug={slug}
        categoryName={category.name}
        categoryType={categoryType}
      />
    </Suspense>
  );
}
