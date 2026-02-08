import {
  AUTH_MESSAGES,
  VALIDATION_PATTERNS,
  PASSWORD_MIN_LENGTH,
  FULL_NAME_MIN_LENGTH,
  OTP_LENGTH,
} from "../constants";
import type {
  LoginFormData,
  SignupFormData,
  ForgotPasswordFormData,
  FormErrors,
  AuthFormData,
} from "../types";

export const validateLoginForm = (data: LoginFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.emailOrPhone.trim()) {
    errors.emailOrPhone = AUTH_MESSAGES.REQUIRED_FIELD;
  } else if (!VALIDATION_PATTERNS.EMAIL_OR_PHONE.test(data.emailOrPhone)) {
    errors.emailOrPhone = AUTH_MESSAGES.INVALID_EMAIL_OR_PHONE;
  }

  if (!data.password) {
    errors.password = AUTH_MESSAGES.REQUIRED_FIELD;
  } else if (data.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = AUTH_MESSAGES.PASSWORD_MIN_LENGTH;
  }

  return errors;
};

export const validateSignupForm = (data: SignupFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = AUTH_MESSAGES.REQUIRED_FIELD;
  } else if (data.fullName.trim().length < FULL_NAME_MIN_LENGTH) {
    errors.fullName = AUTH_MESSAGES.FULL_NAME_MIN_LENGTH;
  }

  if (!data.email.trim()) {
    errors.email = AUTH_MESSAGES.REQUIRED_FIELD;
  } else if (!VALIDATION_PATTERNS.EMAIL.test(data.email)) {
    errors.email = AUTH_MESSAGES.INVALID_EMAIL;
  }

  if (!data.phone.trim()) {
    errors.phone = AUTH_MESSAGES.REQUIRED_FIELD;
  } else if (!VALIDATION_PATTERNS.PHONE.test(data.phone)) {
    errors.phone = AUTH_MESSAGES.INVALID_PHONE;
  }

  if (!data.password) {
    errors.password = AUTH_MESSAGES.REQUIRED_FIELD;
  } else if (data.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = AUTH_MESSAGES.PASSWORD_MIN_LENGTH;
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = AUTH_MESSAGES.REQUIRED_FIELD;
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = AUTH_MESSAGES.PASSWORD_MISMATCH;
  }

  return errors;
};

export const validateForgotPasswordForm = (
  data: ForgotPasswordFormData,
): FormErrors => {
  const errors: FormErrors = {};

  if (!data.email.trim()) {
    errors.email = AUTH_MESSAGES.REQUIRED_FIELD;
  } else if (!VALIDATION_PATTERNS.EMAIL.test(data.email)) {
    errors.email = AUTH_MESSAGES.INVALID_EMAIL;
  }

  return errors;
};

export const validateOtp = (otp: string): string | undefined => {
  if (!otp || otp.trim() === "") {
    return AUTH_MESSAGES.OTP_REQUIRED;
  }

  if (otp.length !== OTP_LENGTH || !/^\d{6}$/.test(otp)) {
    return AUTH_MESSAGES.INVALID_OTP;
  }

  return undefined;
};

export const validateAuthForm = (data: AuthFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.email.trim()) {
    errors.email = AUTH_MESSAGES.REQUIRED_FIELD;
  } else if (!VALIDATION_PATTERNS.EMAIL.test(data.email)) {
    errors.email = AUTH_MESSAGES.INVALID_EMAIL;
  }

  if (!data.agreeToTerms) {
    errors.agreeToTerms =
      "You must agree to the Terms of Use and Privacy Policy";
  }

  return errors;
};
