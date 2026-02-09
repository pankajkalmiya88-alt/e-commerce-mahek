import apiClient from "@/lib/api-client";
import type {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  UserData,
} from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const authService = {
  async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
    return apiClient.post<SendOtpResponse>("/auth/send-otp", data);
  },

  async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to verify OTP" }));
      throw new Error(error.message || "Failed to verify OTP");
    }

    const authHeader = response.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader;
      this.setAuthToken(token);
    }

    const result = await response.json();

    if (result.token && !authHeader) {
      this.setAuthToken(result.token);
    }

    if (result.user || result.id) {
      const userData: UserData = result.user || {
        id: result.id,
        email: result.email,
        name: result.name,
        role: result.role,
        addresses: result.addresses || [],
      };
      this.setUserData(userData);
    }

    return result;
  },

  setAuthToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
  },

  getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken");
    }
    return null;
  },

  setUserData(userData: UserData): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  },

  getUserData(): UserData | null {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("userData");
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  clearAuth(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
    }
  },
};
