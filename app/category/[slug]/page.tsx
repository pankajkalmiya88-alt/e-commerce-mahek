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
    <CategoryPageContent
      categorySlug={slug}
      categoryName={category.name}
      categoryType={categoryType}
    />
  );
}
