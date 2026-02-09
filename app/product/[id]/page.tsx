import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ROUTES } from "@/constants/routes";
import { generateSEO } from "@/lib/utils/seo";
import { ProductDetailClient } from "./ProductDetailClient";
import { ProductTabs } from "./ProductTabs";
import { productService } from "@/features/products/services/product.service";
import { adaptAPIProductToUI } from "@/features/products/utils/product-adapter";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const { products } = await productService.getProductsList({
      limit: 500,
      page: 1,
    });
    return products.map((product) => ({ id: product.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const apiProduct = await productService.getProductById(id);
    const product = adaptAPIProductToUI(apiProduct);

    return generateSEO({
      title: `${product.name} - Mahek Sarees`,
      description: product.description || "",
    });
  } catch (error) {
    return generateSEO({
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    });
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  
  let apiProduct;
  try {
    apiProduct = await productService.getProductById(id);
  } catch (error) {
    notFound();
  }

  const product = adaptAPIProductToUI(apiProduct);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center gap-2 text-sm font-poppins">
            <Link href={ROUTES.HOME} className="text-gray-600 hover:text-primary transition-colors">
              HOME
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-gray-900 font-medium">SHOP DETAILS</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductImageGallery
            images={product.images}
            productName={product.name}
            productId={product.id}
            label={product.label}
            bestseller={product.bestseller}
          />

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-semibold text-gray-900 mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < (product.rating?.average || 4) ? "text-yellow-400" : "text-gray-300"
                      } fill-current`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-poppins">
                  {product.rating?.count || 0} Reviews
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-600 font-poppins">Fabric:</span>
                <span className="text-sm font-medium font-poppins">{product.fabric || "Viscose"}</span>
                <span className="text-sm text-gray-600 font-poppins ml-4">SKU:</span>
                <span className="text-sm font-medium font-poppins">{product.sku || "N/A"}</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
                  ₹{product.price.current.toLocaleString()}
                </span>
                {product.price.original && (
                  <>
                    <span className="text-xl text-gray-400 line-through font-poppins">
                      ₹{product.price.original.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-red-600 font-poppins">
                      ({product.price.discount}%)
                    </span>
                  </>
                )}
              </div>
            </div>

            <ProductDetailClient product={product} />
          </div>
        </div>

        <ProductTabs product={product} />
      </div>
    </div>
  );
}
