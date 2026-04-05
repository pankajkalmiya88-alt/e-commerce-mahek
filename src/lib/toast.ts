import { toast as sonnerToast } from 'sonner';
import type { ToastOptions, APIResponse, ToastType } from '@/types/toast';

export class ToastService {
  private static readonly DEFAULT_DURATION = 3000;

  static success(message: string, duration?: number): void {
    sonnerToast.success(message, {
      duration: duration || this.DEFAULT_DURATION,
    });
  }

  static error(message: string, duration?: number): void {
    sonnerToast.error(message, {
      duration: duration || this.DEFAULT_DURATION,
    });
  }

  static info(message: string, duration?: number): void {
    sonnerToast.info(message, {
      duration: duration || this.DEFAULT_DURATION,
    });
  }

  static warning(message: string, duration?: number): void {
    sonnerToast.warning(message, {
      duration: duration || this.DEFAULT_DURATION,
    });
  }

  static handleAPIResponse<T>(
    response: APIResponse<T>,
    options?: ToastOptions
  ): void {
    if (options?.doNotShow) {
      return;
    }

    const message = options?.customMessage || response.message;
    const duration = options?.duration;

    if (!message) {
      return;
    }

    if (response.success !== false && !response.error) {
      this.success(message, duration);
    } else {
      this.error(message, duration);
    }
  }

  static handleAPIError(error: unknown, options?: ToastOptions): void {
    if (options?.doNotShow) {
      return;
    }

    let errorMessage = 'An unexpected error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = String(error.message);
    }

    const message = options?.customMessage || errorMessage;
    this.error(message, options?.duration);
  }

  static custom(
    type: ToastType,
    message: string,
    options?: Omit<ToastOptions, 'customMessage' | 'doNotShow'>
  ): void {
    switch (type) {
      case 'success':
        this.success(message, options?.duration);
        break;
      case 'error':
        this.error(message, options?.duration);
        break;
      case 'info':
        this.info(message, options?.duration);
        break;
      case 'warning':
        this.warning(message, options?.duration);
        break;
    }
  }
}

export const toast = ToastService;
