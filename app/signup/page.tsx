"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { AuthContainer } from "@/features/auth/components/AuthContainer";
import { FormInput } from "@/features/auth/components/FormInput";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { AuthButton } from "@/features/auth/components/AuthButton";
import { OtpInput } from "@/features/auth/components/OtpInput";
import { validateSignupForm, validateOtp } from "@/features/auth/utils/validation";
import { authService } from "@/features/auth/services/auth.service";
import { AUTH_MESSAGES } from "@/features/auth/constants";
import type { SignupFormData, FormErrors } from "@/features/auth/types";

type SignupStep = "form" | "otp";

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
  const [currentStep, setCurrentStep] = useState<SignupStep>("form");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const validationErrors = validateSignupForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      await authService.sendOtp({
        email: formData.email,
        name: formData.fullName,
      });
      
      setSuccessMessage(AUTH_MESSAGES.OTP_SENT);
      setCurrentStep("otp");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to send OTP";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    setErrorMessage("");
    setSuccessMessage("");

    const otpValidationError = validateOtp(otp);
    if (otpValidationError) {
      setOtpError(otpValidationError);
      return;
    }

    setIsLoading(true);

    try {
      await authService.verifyOtp({
        email: formData.email,
        otp: otp,
      });
      
      setSuccessMessage(AUTH_MESSAGES.SIGNUP_SUCCESS);
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to verify OTP";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setOtpError("");
    setOtp("");
    setIsLoading(true);

    try {
      await authService.sendOtp({
        email: formData.email,
        name: formData.fullName,
      });
      
      setSuccessMessage(AUTH_MESSAGES.OTP_SENT);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to resend OTP";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToForm = () => {
    setCurrentStep("form");
    setOtp("");
    setOtpError("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const isFormValid = () => {
    const { fullName, email, phone, password, confirmPassword } = formData;
    return (
      fullName.trim().length >= 2 &&
      email.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      phone.trim() !== "" &&
      /^[6-9]\d{9}$/.test(phone) &&
      password.length >= 8 &&
      confirmPassword !== "" &&
      password === confirmPassword
    );
  };

  if (currentStep === "otp") {
    return (
      <AuthContainer
        title="Verify OTP"
        subtitle={`Enter the 6-digit code sent to ${formData.email}`}
      >
        <div className="space-y-6">
          {successMessage && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-poppins text-green-800">{successMessage}</p>
            </div>
          )}
          
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-poppins text-red-800">{errorMessage}</p>
            </div>
          )}

          <OtpInput
            value={otp}
            onChange={(value) => {
              setOtp(value);
              if (otpError) setOtpError("");
            }}
            error={otpError}
            disabled={isLoading}
          />

          <AuthButton
            className="bg-[#7d1f3e]"
            type="button"
            onClick={handleVerifyOtp}
            isLoading={isLoading}
          >
            Verify OTP
          </AuthButton>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={handleBackToForm}
              className="font-poppins text-text-secondary hover:text-secondary transition-colors underline-offset-2 hover:underline"
              disabled={isLoading}
            >
              ← Back to form
            </button>
            <button
              type="button"
              onClick={handleResendOtp}
              className="font-poppins font-semibold text-secondary hover:text-secondary-dark transition-colors underline-offset-2 hover:underline"
              disabled={isLoading}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer
      title="Create Account"
      subtitle="Join us and start your journey"
    >
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm font-poppins text-red-800">{errorMessage}</p>
        </div>
      )}
      
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

        <AuthButton 
          className="bg-[#7d1f3e]" 
          type="submit" 
          isLoading={isLoading}
          disabled={!isFormValid() || isLoading}
        >
          Send OTP
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
