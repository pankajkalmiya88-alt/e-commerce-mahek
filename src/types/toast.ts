export interface ToastOptions {
  customMessage?: string;
  doNotShow?: boolean;
  duration?: number;
}

export interface APIResponse<T = unknown> {
  message?: string;
  data?: T;
  error?: string;
  success?: boolean;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
