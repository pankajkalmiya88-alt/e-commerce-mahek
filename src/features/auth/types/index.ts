export interface LoginFormData {
  emailOrPhone: string;
  password: string;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface SendOtpRequest {
  email: string;
  name: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: UserData;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  addresses: Address[];
}

export interface Address {
  id?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface AuthFormData {
  email: string;
  agreeToTerms: boolean;
}
