import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../apiconfig/apiClient';
import useAuthStore from '../stores/useAuthStore';
import Toast from 'react-native-toast-message';

/**
 * Common hook for POST requests with automatic token injection and toast messages
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Mutation options
 * @param {string} options.successMessage - Success message to display
 * @param {string} options.errorMessage - Error message to display
 * @param {boolean} options.showSuccessToast - Show success toast (default: true)
 * @param {boolean} options.showErrorToast - Show error toast (default: true)
 * @param {boolean} options.requiresAuth - Requires authentication (default: true)
 * @param {Array<string>} options.invalidateQueries - Query keys to invalidate on success
 * @param {Function} options.onSuccess - Additional onSuccess callback
 * @param {Function} options.onError - Additional onError callback
 * @returns {Object} React Query mutation result
 */
export const usePost = (endpoint, options = {}) => {
  const { getToken } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    successMessage = 'Success',
    errorMessage,
    showSuccessToast = true,
    showErrorToast = true,
    requiresAuth = true,
    invalidateQueries = [],
    onSuccess: customOnSuccess,
    onError: customOnError,
    isFormData = false,
  } = options;

  return useMutation({
    mutationFn: async (data) => {
      const token = requiresAuth ? getToken() : null;
      return apiClient.post(endpoint, data, token, isFormData);
    },
    onSuccess: (data, variables, context) => {
      // Show success toast
      if (showSuccessToast) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: data?.message || successMessage,
        });
      }

      // Invalidate queries
      if (invalidateQueries.length > 0) {
        invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });
        });
      }

      // Call custom onSuccess
      if (customOnSuccess) {
        customOnSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      // Extract error message from API response or error object
      const apiErrorMessage = error?.data?.message || error?.message || errorMessage || 'Something went wrong';

      // Show error toast
      if (showErrorToast) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: apiErrorMessage,
        });
      }

      // Call custom onError
      if (customOnError) {
        customOnError(error, variables, context);
      }
    },
  });
};

/**
 * Common hook for PUT requests with automatic token injection and toast messages
 * @param {string|Function} endpoint - API endpoint or function that returns endpoint
 * @param {Object} options - Mutation options (same as usePost)
 * @returns {Object} React Query mutation result
 */
export const usePut = (endpoint, options = {}) => {
  const { getToken } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    successMessage = 'Updated successfully',
    errorMessage,
    showSuccessToast = true,
    showErrorToast = true,
    requiresAuth = true,
    invalidateQueries = [],
    onSuccess: customOnSuccess,
    onError: customOnError,
    isFormData = false,
  } = options;

  return useMutation({
    mutationFn: async (data) => {
      const token = requiresAuth ? getToken() : null;
      const url = typeof endpoint === 'function' ? endpoint(data) : endpoint;
      return apiClient.put(url, data, token, isFormData);
    },
    onSuccess: (data, variables, context) => {
      if (showSuccessToast) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: data?.message || successMessage,
        });
      }

      if (invalidateQueries.length > 0) {
        invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });
        });
      }

      if (customOnSuccess) {
        customOnSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      const apiErrorMessage = error?.data?.message || error?.message || errorMessage || 'Failed to update';

      if (showErrorToast) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: apiErrorMessage,
        });
      }

      if (customOnError) {
        customOnError(error, variables, context);
      }
    },
  });
};

/**
 * Common hook for DELETE requests with automatic token injection and toast messages
 * @param {string|Function} endpoint - API endpoint or function that returns endpoint
 * @param {Object} options - Mutation options (same as usePost)
 * @returns {Object} React Query mutation result
 */
export const useDelete = (endpoint, options = {}) => {
  const { getToken } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    successMessage = 'Deleted successfully',
    errorMessage,
    showSuccessToast = true,
    showErrorToast = true,
    requiresAuth = true,
    invalidateQueries = [],
    onSuccess: customOnSuccess,
    onError: customOnError,
  } = options;

  return useMutation({
    mutationFn: async (id) => {
      const token = requiresAuth ? getToken() : null;
      const url = typeof endpoint === 'function' ? endpoint(id) : `${endpoint}/${id}`;
      return apiClient.delete(url, token);
    },
    onSuccess: (data, variables, context) => {
      if (showSuccessToast) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: data?.message || successMessage,
        });
      }

      if (invalidateQueries.length > 0) {
        invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });
        });
      }

      if (customOnSuccess) {
        customOnSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      const apiErrorMessage = error?.data?.message || error?.message || errorMessage || 'Failed to delete';

      if (showErrorToast) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: apiErrorMessage,
        });
      }

      if (customOnError) {
        customOnError(error, variables, context);
      }
    },
  });
};

/**
 * Common hook for PATCH requests with automatic token injection and toast messages
 * @param {string|Function} endpoint - API endpoint or function that returns endpoint
 * @param {Object} options - Mutation options (same as usePost)
 * @returns {Object} React Query mutation result
 */
export const usePatch = (endpoint, options = {}) => {
  const { getToken } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    successMessage = 'Updated successfully',
    errorMessage,
    showSuccessToast = true,
    showErrorToast = true,
    requiresAuth = true,
    invalidateQueries = [],
    onSuccess: customOnSuccess,
    onError: customOnError,
  } = options;

  return useMutation({
    mutationFn: async (data) => {
      const token = requiresAuth ? getToken() : null;
      const url = typeof endpoint === 'function' ? endpoint(data) : endpoint;
      return apiClient.request(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        token,
      });
    },
    onSuccess: (data, variables, context) => {
      if (showSuccessToast) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: data?.message || successMessage,
        });
      }

      if (invalidateQueries.length > 0) {
        invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });
        });
      }

      if (customOnSuccess) {
        customOnSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      const apiErrorMessage = error?.data?.message || error?.message || errorMessage || 'Failed to update';

      if (showErrorToast) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: apiErrorMessage,
        });
      }

      if (customOnError) {
        customOnError(error, variables, context);
      }
    },
  });
};
