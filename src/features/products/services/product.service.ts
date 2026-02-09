import apiClient from "@/lib/api-client";
import type {
  Product,
  ProductsListResponse,
  ProductsListParams,
} from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class ProductService {
  async getProductsList(
    params: ProductsListParams = {},
  ): Promise<ProductsListResponse> {
    const queryParams = new URLSearchParams();

    if (params.type) queryParams.append("type", params.type);
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.minPrice)
      queryParams.append("minPrice", params.minPrice.toString());
    if (params.maxPrice)
      queryParams.append("maxPrice", params.maxPrice.toString());
    if (params.sort) queryParams.append("sort", params.sort);
    if (params.color) queryParams.append("color", params.color);
    if (params.size) queryParams.append("size", params.size);
    if (params.availability)
      queryParams.append("availability", params.availability);
    if (params.page) queryParams.append("page", params.page.toString());

    const url = `${BASE_URL}/products/list${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    try {
      const response = await apiClient.get<ProductsListResponse>(url);
      return response;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async getProductBySlug(slug: string): Promise<Product> {
    try {
      const response = await apiClient.get<Product>(
        `${BASE_URL}/products/${slug}`,
      );
      return response;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await apiClient.get<Product>(
        `${BASE_URL}/products/${id}`,
      );
      return response;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }
}

export const productService = new ProductService();
