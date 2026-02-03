"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { AuthContainer } from "@/features/auth/components/AuthContainer";
import { FormInput } from "@/features/auth/components/FormInput";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { AuthButton } from "@/features/auth/components/AuthButton";
import { validateSignupForm } from "@/features/auth/utils/validation";
import type { SignupFormData, FormErrors } from "@/features/auth/types";

export default function SignupPage() {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    const validationErrors = validateSignupForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Signup data:", formData);
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer
      title="Create Account"
      subtitle="Join us and start your journey"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Full Name"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Enter your full name"
          autoComplete="name"
        />

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email address"
          autoComplete="email"
        />

        <FormInput
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="Enter your 10-digit phone number"
          autoComplete="tel"
          maxLength={10}
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Create a password (min 8 characters)"
          autoComplete="new-password"
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />

        <AuthButton className="bg-[#7d1f3e]" type="submit" isLoading={isLoading}>
          Create Account
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
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-secondary font-semibold hover:text-secondary-dark transition-colors underline-offset-2 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthContainer>
  );
}
