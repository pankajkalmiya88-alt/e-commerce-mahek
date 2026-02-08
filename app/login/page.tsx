"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContainer } from "@/features/auth/components/AuthContainer";
import { FormInput } from "@/features/auth/components/FormInput";
import { AuthButton } from "@/features/auth/components/AuthButton";
import { OtpInput } from "@/features/auth/components/OtpInput";
import { validateAuthForm, validateOtp } from "@/features/auth/utils/validation";
import { authService } from "@/features/auth/services/auth.service";
import { AUTH_MESSAGES } from "@/features/auth/constants";
import { getRedirectUrl } from "@/lib/auth-utils";
import type { AuthFormData, FormErrors } from "@/features/auth/types";

type AuthStep = "email" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<AuthStep>("email");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    const userData = typeof window !== "undefined" ? localStorage.getItem("userData") : null;
    
    if (token && userData) {
      const redirectUrl = getRedirectUrl(searchParams);
      router.replace(redirectUrl);
    }
  }, [router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setErrorMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const validationErrors = validateAuthForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      await authService.sendOtp({
        email: formData.email,
        name: "",
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
      const result = await authService.verifyOtp({
        email: formData.email,
        otp: otp,
      });
      
      setSuccessMessage(AUTH_MESSAGES.OTP_VERIFIED);
      
      const redirectUrl = getRedirectUrl(searchParams);
      
      setTimeout(() => {
        router.push(redirectUrl);
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
        name: "",
      });
      
      setSuccessMessage(AUTH_MESSAGES.OTP_SENT);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to resend OTP";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setCurrentStep("email");
    setOtp("");
    setOtpError("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const isFormValid = () => {
    return (
      formData.email.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.agreeToTerms
    );
  };

  return (
    <AuthContainer
      title="Login or Signup"
      subtitle=""
    >
      {currentStep === "email" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label=""
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Email Address*"
            autoComplete="email"
          />

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mt-1 w-4 h-4 rounded border-border text-secondary focus:ring-secondary focus:ring-2"
            />
            <label htmlFor="agreeToTerms" className="text-sm font-poppins text-text-secondary leading-relaxed">
              By continuing, I agree to the{" "}
              <Link href="/terms" className="text-secondary font-semibold hover:underline">
                Terms of Use
              </Link>{" "}
              &{" "}
              <Link href="/privacy" className="text-secondary font-semibold hover:underline">
                Privacy Policy
              </Link>{" "}
              and I am above 18 years old.
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm font-poppins text-red-600 -mt-2">{errors.agreeToTerms}</p>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-poppins text-red-600">{errorMessage}</p>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-poppins text-green-600">{successMessage}</p>
            </div>
          )}

          <AuthButton 
            type="submit" 
            isLoading={isLoading}
            disabled={!isFormValid() || isLoading}
          >
            CONTINUE
          </AuthButton>

          <div className="text-center">
            <p className="text-sm font-poppins text-text-secondary">
              Have trouble logging in?{" "}
              <Link
                href="/help"
                className="text-secondary font-semibold hover:underline"
              >
                Get help
              </Link>
            </p>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm font-poppins text-text-secondary mb-6">
              We&apos;ve sent a 6-digit OTP to <span className="font-semibold text-text-primary">{formData.email}</span>
            </p>
          </div>

          <OtpInput
            value={otp}
            onChange={setOtp}
            error={otpError}
            disabled={isLoading}
          />

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-poppins text-red-600">{errorMessage}</p>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-poppins text-green-600">{successMessage}</p>
            </div>
          )}

          <AuthButton 
            type="button"
            onClick={handleVerifyOtp}
            isLoading={isLoading}
            disabled={otp.length !== 6 || isLoading}
          >
            VERIFY OTP
          </AuthButton>

          <div className="flex items-center justify-between text-sm font-poppins">
            <button
              type="button"
              onClick={handleBackToEmail}
              className="text-secondary font-semibold hover:underline"
              disabled={isLoading}
            >
              Change Email
            </button>
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-secondary font-semibold hover:underline"
              disabled={isLoading}
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </AuthContainer>
  );
}
