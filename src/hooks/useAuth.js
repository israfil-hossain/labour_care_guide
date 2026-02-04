/**
 * Authentication Hooks
 *
 * Professional authentication system with:
 * - Automatic token refresh on 401 errors
 * - Zustand state management with AsyncStorage persistence
 * - Redux sync for backward compatibility
 * - React Query for API state management
 *
 * Available Hooks:
 * - useLogin() - Login user with email/password
 * - useLogout() - Logout user and clear all state
 * - useProfile() - Get authenticated user profile (auto-refreshes)
 * - useRefreshToken() - Manually refresh access token
 * - useForgotPassword() - Send password reset email
 * - useValidateResetToken(token) - Validate password reset token
 * - useResetPassword() - Reset password with token
 * - useChangePassword() - Change authenticated user password
 *
 * Example Usage:
 *
 * // Login
 * const { mutate: login, isPending } = useLogin();
 * login({ email: 'user@example.com', password: 'password123' });
 *
 * // Get Profile
 * const { data: profile, isLoading } = useProfile();
 *
 * // Logout
 * const { mutate: logout } = useLogout();
 * logout();
 */

import { usePost } from './useCommonMutation';
import { useGet } from './useCommonQuery';
import useAuthStore from '../stores/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';

/**
 * Hook for user login
 *
 * @returns {MutationResult} mutation object with mutate function
 * @example
 * const { mutate: login, isPending, error } = useLogin();
 * login({ email: 'user@example.com', password: 'password123' });
 */
export const useLogin = () => {
  const { login } = useAuthStore();

  return usePost('/auth/login', {
    requiresAuth: false,
    showSuccessToast: true,
    onSuccess: (response) => {
      console.log('=== LOGIN SUCCESS ===');

      if (response?.data) {
        const { accessToken, refreshToken, user } = response.data;
        // Update Zustand store
        login(user, accessToken, refreshToken);
      }
    },
  });
};

/**
 * Hook for user logout
 */
export const useLogout = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return usePost('/auth/logout', {
    requiresAuth: true,
    showSuccessToast: true,
    onSuccess: () => {
      console.log('=== LOGOUT SUCCESS ===');
      // Clear Zustand store
      logout();
      // Clear React Query cache
      queryClient.clear();
    },
    onError: (error) => {
      console.error('=== LOGOUT ERROR ===', error.message);
      // Still clear auth data even if API call fails
      logout();
      queryClient.clear();
    },
  });
};

/**
 * Hook for getting user profile
 */
export const useProfile = (options = {}) => {
  const { isAuthenticated } = useAuthStore();

  return useGet(
    'profile',
    '/auth/profile',
    {
      requiresAuth: true,
      enabled: isAuthenticated,
      staleTime: 5 * 60 * 1000, // 5 minutes
      ...options,
    }
  );
};

/**
 * Hook for refreshing tokens
 */
export const useRefreshToken = () => {
  const { login } = useAuthStore();

  return usePost('/auth/refresh-token', {
    requiresAuth: false,
    showSuccessToast: false,
    showErrorToast: false,
    onSuccess: (response) => {
      if (response?.data) {
        const { accessToken, refreshToken: newRefreshToken, user } = response.data;
        // Update Zustand store
        login(user, accessToken, newRefreshToken);
      }
    },
  });
};

/**
 * Hook for forgot password
 */
export const useForgotPassword = () => {
  return usePost('/auth/forgot-password', {
    requiresAuth: false,
    showSuccessToast: true,
  });
};

/**
 * Hook for validating password reset token
 * @param {string} token - Reset token to validate
 */
export const useValidateResetToken = (token, options = {}) => {
  return useGet(
    ['validateResetToken', token],
    `/auth/reset-password/validate?token=${token}`,
    {
      requiresAuth: false,
      enabled: !!token,
      retry: false,
      showErrorToast: false,
      ...options,
    }
  );
};

/**
 * Hook for reset password
 */
export const useResetPassword = () => {
  return usePost('/auth/reset-password', {
    requiresAuth: false,
    showSuccessToast: true,
  });
};

/**
 * Hook for change password
 */
export const useChangePassword = () => {
  return usePost('/auth/change-password', {
    requiresAuth: true,
    showSuccessToast: true,
  });
};
