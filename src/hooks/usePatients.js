import { useGet } from './useCommonQuery';
import { usePost } from './useCommonMutation';
import useAuthStore from '../stores/useAuthStore';

/**
 * Helper function to build query string from params
 */
const buildQueryString = (params) => {
  if (!params || typeof params !== 'object') return '';

  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value.toString());
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Hook for fetching patients list with filters and pagination
 * @param {Object} params - Query parameters
 * @param {string} params.filterBy - Filter field (e.g., 'highRisk', 'activeLabour')
 * @param {string} params.filterValue - Filter value (true/false)
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.wardId - Ward ID filter
 * @param {string} params.search - Search term
 * @param {Object} options - React Query options
 */
export const usePatients = (params = {}, options = {}) => {
  const { isAuthenticated } = useAuthStore();
  const queryString = buildQueryString(params);

  return useGet(
    ['patients', params],
    `/staff/patient/v1${queryString}`,
    {
      requiresAuth: true,
      enabled: isAuthenticated,
      staleTime: 2 * 60 * 1000, // 2 minutes
      ...options,
    }
  );
};

/**
 * Hook for infinite scroll patients list
 * @param {Object} params - Query parameters
 * @param {Object} options - React Query options
 */
export const useInfinitePatients = (params = {}, options = {}) => {
  const { isAuthenticated } = useAuthStore();
  const queryString = buildQueryString(params);

  return useGet(
    ['patients', 'infinite', params],
    `/staff/patient/v1${queryString}`,
    {
      requiresAuth: true,
      enabled: isAuthenticated,
      ...options,
    }
  );
};

/**
 * Hook for searching patients
 * @param {Object} params - Search parameters
 * @param {Object} options - React Query options
 */
export const useSearchPatients = (params = {}, options = {}) => {
  const { isAuthenticated } = useAuthStore();
  const queryString = buildQueryString(params);

  return useGet(
    ['patients', 'search', params],
    `/staff/patient/v1${queryString}`,
    {
      requiresAuth: true,
      enabled: isAuthenticated && !!params.search,
      staleTime: 30 * 1000, // 30 seconds
      ...options,
    }
  );
};

/**
 * Hook for getting patient by ID
 * @param {string} patientId - Patient ID
 * @param {Object} options - React Query options
 */
export const usePatient = (patientId, options = {}) => {
  const { isAuthenticated } = useAuthStore();

  return useGet(
    ['patient', patientId],
    `/staff/patient/v1/single?patientId=${patientId}`,
    {
      requiresAuth: true,
      enabled: isAuthenticated && !!patientId,
      staleTime: 5 * 60 * 1000, // 5 minutes
      ...options,
    }
  );
};

/**
 * Hook for adding a new patient
 */
export const useAddPatient = () => {
  return usePost('/staff/patient/v1', {
    requiresAuth: true,
    showSuccessToast: true,
  });
};

/**
 * Hook for transferring patient
 */
export const useTransferPatient = () => {
  return usePost('/staff/patient/v1/transfer-patient', {
    requiresAuth: true,
    showSuccessToast: true,
  });
};

/**
 * Hook for declaring patient
 */
export const useDeclarePatient = () => {
  return usePost('/staff/patient/v1/declare', {
    requiresAuth: true,
    showSuccessToast: true,
  });
};

/**
 * Hook for discharging patient
 */
export const useDischargePatient = () => {
  return usePost('/staff/patient/v1/discharge', {
    requiresAuth: true,
    showSuccessToast: true,
  });
};

/**
 * Hook for toggling high risk status
 */
export const useToggleHighRisk = () => {
  return usePost('/staff/patient/v1/toggle-highrisk', {
    requiresAuth: true,
    showSuccessToast: true,
  });
};
