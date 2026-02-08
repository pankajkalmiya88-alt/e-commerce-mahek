import apiClient from "@/lib/api-client";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
}

interface UpdateProductRequest {
  name?: string;
  price?: number;
  description?: string;
}

export const productService = {
  async getAll(): Promise<Product[]> {
    return apiClient.get<Product[]>("/api/products");
  },

  async getById(id: string): Promise<Product> {
    return apiClient.get<Product>(`/api/products/${id}`);
  },

  async create(data: CreateProductRequest): Promise<Product> {
    return apiClient.post<Product>("/api/products", data);
  },

  async update(id: string, data: UpdateProductRequest): Promise<Product> {
    return apiClient.put<Product>(`/api/products/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/products/${id}`);
  },
};

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    return apiClient.get<UserProfile>("/api/user/profile");
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return apiClient.patch<UserProfile>("/api/user/profile", data);
  },
};
