import { redirect } from "next/navigation";
import { productService } from "@/features/products/services/product.service";
import { ROUTES } from "@/constants/routes";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return [];
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  
  try {
    const product = await productService.getProductById(id);
    redirect(ROUTES.CATEGORY(product.category.toLowerCase().replace(/_/g, "-")));
  } catch (error) {
    redirect(ROUTES.SHOP);
  }
}
