import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../apiconfig/apiClient';
import useAuthStore from '../stores/useAuthStore';
import Toast from 'react-native-toast-message';

/**
 * Common hook for GET requests with automatic token injection
 * @param {string} queryKey - Unique key for the query (array or string)
 * @param {string} endpoint - API endpoint to fetch from
 * @param {Object} options - React Query options
 * @param {boolean} options.showErrorToast - Show error toast (default: true)
 * @param {boolean} options.requiresAuth - Requires authentication (default: true)
 * @returns {Object} React Query result
 */
export const useGet = (queryKey, endpoint, options = {}) => {
  const { getToken } = useAuthStore();
  const {
    showErrorToast = true,
    requiresAuth = true,
    ...queryOptions
  } = options;

  return useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: async () => {
      const token = requiresAuth ? getToken() : null;

      try {
        const response = await apiClient.get(endpoint, token);
        return response;
      } catch (error) {
        if (showErrorToast) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error.message || 'Failed to fetch data',
          });
        }
        throw error;
      }
    },
    ...queryOptions,
  });
};

/**
 * Hook for GET requests with dynamic parameters
 * @param {string|Array} queryKey - Unique key for the query
 * @param {Function} endpointFn - Function that returns endpoint (receives params)
 * @param {Object} params - Parameters to pass to endpointFn
 * @param {Object} options - React Query options
 * @returns {Object} React Query result
 */
export const useGetWithParams = (queryKey, endpointFn, params, options = {}) => {
  const { getToken } = useAuthStore();
  const {
    showErrorToast = true,
    requiresAuth = true,
    ...queryOptions
  } = options;

  return useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey, params],
    queryFn: async () => {
      const token = requiresAuth ? getToken() : null;
      const endpoint = typeof endpointFn === 'function' ? endpointFn(params) : endpointFn;

      try {
        const response = await apiClient.get(endpoint, token);
        return response;
      } catch (error) {
        if (showErrorToast) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error.message || 'Failed to fetch data',
          });
        }
        throw error;
      }
    },
    enabled: !!params, // Only fetch if params exist
    ...queryOptions,
  });
};
