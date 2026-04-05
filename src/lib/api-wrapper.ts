import { toast } from '@/lib/toast';
import type { ToastOptions, APIResponse } from '@/types/toast';

export async function withToast<T>(
  apiCall: () => Promise<APIResponse<T>>,
  options?: ToastOptions
): Promise<T | undefined> {
  try {
    const response = await apiCall();
    toast.handleAPIResponse(response, options);
    return response.data;
  } catch (error) {
    toast.handleAPIError(error, options);
    return undefined;
  }
}

export async function withSilentError<T>(
  apiCall: () => Promise<T>,
  fallbackValue: T
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    console.error('Silent API error:', error);
    return fallbackValue;
  }
}

export async function withCustomToast<T>(
  apiCall: () => Promise<APIResponse<T>>,
  successMessage: string,
  errorMessage?: string
): Promise<T | undefined> {
  try {
    const response = await apiCall();
    toast.handleAPIResponse(response, {
      customMessage: successMessage
    });
    return response.data;
  } catch (error) {
    toast.handleAPIError(error, {
      customMessage: errorMessage || 'An error occurred'
    });
    return undefined;
  }
}
