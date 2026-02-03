import { Metadata } from "next";
import { ProductCard } from "@/components/product/ProductCard";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { generateSEO } from "@/lib/utils/seo";

export const metadata: Metadata = generateSEO({
  title: "All Products - Mahek Sarees",
  description: "Browse our complete collection of designer sarees, lehengas, and traditional wear",
});

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background-gray">
      <div className="bg-primary text-white py-12">
        <div className="container-fluid">
          <h1 className="text-3xl md:text-4xl font-playfair font-semibold text-center">
            All Products
          </h1>
          <p className="text-center text-white/90 mt-2 font-poppins">
            Discover our complete collection of designer ethnic wear
          </p>
        </div>
      </div>

      <div className="container-fluid py-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-text-secondary font-poppins">
            Showing {MOCK_PRODUCTS.length} products
          </p>
          <select className="border border-border rounded px-4 py-2 text-sm font-poppins focus:outline-none focus:border-primary">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
