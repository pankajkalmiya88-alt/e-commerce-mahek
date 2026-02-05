import { Metadata } from "next";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { generateSEO } from "@/lib/utils/seo";
import { ProductsPageContent } from "@/features/products/components/ProductsPageContent";

export const metadata: Metadata = generateSEO({
  title: "All Products - Mahek Sarees",
  description: "Browse our complete collection of designer sarees, lehengas, and traditional wear",
});

export default function ProductsPage() {
  return <ProductsPageContent products={MOCK_PRODUCTS} />;
}
