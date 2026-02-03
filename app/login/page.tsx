"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { AuthContainer } from "@/features/auth/components/AuthContainer";
import { FormInput } from "@/features/auth/components/FormInput";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { AuthButton } from "@/features/auth/components/AuthButton";
import { validateLoginForm } from "@/features/auth/utils/validation";
import type { LoginFormData, FormErrors } from "@/features/auth/types";

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrPhone: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Login data:", formData);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    const { emailOrPhone, password } = formData;
    return (
      emailOrPhone.trim() !== "" &&
      /^([^\s@]+@[^\s@]+\.[^\s@]+|[6-9]\d{9})$/.test(emailOrPhone) &&
      password.length >= 8
    );
  };

  return (
    <AuthContainer
      title="Welcome Back"
      subtitle="Login to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email or Phone"
          name="emailOrPhone"
          type="text"
          value={formData.emailOrPhone}
          onChange={handleChange}
          error={errors.emailOrPhone}
          placeholder="Enter your email or phone number"
          autoComplete="username"
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-inter font-medium text-secondary hover:text-secondary-dark transition-colors underline-offset-2 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <AuthButton 
          className="bg-[#7d1f3e]" 
          type="submit" 
          isLoading={isLoading}
          disabled={!isFormValid() || isLoading}
        >
          Login
        </AuthButton>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-text-secondary font-inter">or</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-inter text-text-secondary">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-secondary font-semibold hover:text-secondary-dark transition-colors underline-offset-2 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </AuthContainer>
  );
}
