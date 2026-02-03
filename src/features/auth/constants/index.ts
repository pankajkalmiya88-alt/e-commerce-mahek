export const AUTH_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PHONE: "Please enter a valid 10-digit phone number",
  INVALID_EMAIL_OR_PHONE: "Please enter a valid email or phone number",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
  PASSWORD_MISMATCH: "Passwords do not match",
  FULL_NAME_MIN_LENGTH: "Full name must be at least 2 characters",
  LOGIN_SUCCESS: "Login successful",
  SIGNUP_SUCCESS: "Account created successfully",
  PASSWORD_RESET_SENT: "Password reset link sent to your email",
} as const;

export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[6-9]\d{9}$/,
  EMAIL_OR_PHONE: /^([^\s@]+@[^\s@]+\.[^\s@]+|[6-9]\d{9})$/,
} as const;

export const PASSWORD_MIN_LENGTH = 8;
export const FULL_NAME_MIN_LENGTH = 2;
