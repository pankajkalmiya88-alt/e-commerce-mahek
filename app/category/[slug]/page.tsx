import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { generateSEO } from "@/lib/utils/seo";
import { ProductsPageContent } from "@/features/products/components/ProductsPageContent";
import { CATEGORIES } from "@/constants/categories";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((cat) => cat.slug === slug);

  if (!category) {
    return generateSEO({
      title: "Category Not Found",
      description: "The requested category could not be found",
    });
  }

  return generateSEO({
    title: `${category.name} - Mahek Sarees`,
    description: `Browse our collection of ${category.name.toLowerCase()}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = MOCK_PRODUCTS.filter(
    (product) => product.categorySlug === slug
  );

  return <ProductsPageContent products={categoryProducts} />;
}
