import { apiClient } from '../apiconfig/apiClient';
import { API_ENDPOINTS } from '../apiconfig/endpoints';

/**
 * Auth API functions
 */
export const authApi = {
  /**
   * Login with email and password
   * @param {Object} credentials
   * @param {string} credentials.email
   * @param {string} credentials.password
   * @returns {Promise<Object>} Response with user data and token
   */
  login: async (credentials) => {
    return apiClient.post(API_ENDPOINTS.LOGIN, credentials);
  },

  /**
   * Sign out the current user
   * @param {string} token - Auth token
   * @returns {Promise<Object>}
   */
  signOut: async (token) => {
    return apiClient.post(API_ENDPOINTS.SIGN_OUT, {}, token);
  },

  /**
   * Send OTP for forgot password
   * @param {Object} data
   * @param {string} data.email
   * @returns {Promise<Object>}
   */
  forgotPassword: async (data) => {
    return apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, data);
  },

  /**
   * Reset password with OTP
   * @param {Object} data
   * @param {string} data.email
   * @param {string} data.otp
   * @param {string} data.newPassword
   * @returns {Promise<Object>}
   */
  resetPassword: async (data) => {
    return apiClient.post(API_ENDPOINTS.RESET_PASSWORD, data);
  },

  /**
   * Change password (requires authentication)
   * @param {Object} data
   * @param {string} data.currentPassword
   * @param {string} data.newPassword
   * @param {string} token - Auth token
   * @returns {Promise<Object>}
   */
  changePassword: async (data, token) => {
    return apiClient.post(API_ENDPOINTS.CHANGE_PASSWORD, data, token);
  },

  /**
   * Get staff profile
   * @param {string} token - Auth token
   * @returns {Promise<Object>}
   */
  getProfile: async (token) => {
    return apiClient.get(API_ENDPOINTS.STAFF_PROFILE, token);
  },

  /**
   * Update staff profile
   * @param {Object} data - Profile data
   * @param {string} token - Auth token
   * @returns {Promise<Object>}
   */
  updateProfile: async (data, token) => {
    return apiClient.post(API_ENDPOINTS.UPDATE_PROFILE, data, token);
  },

  /**
   * Set FCM token for push notifications
   * @param {Object} data
   * @param {string} data.fcmToken
   * @param {string} token - Auth token
   * @returns {Promise<Object>}
   */
  setFCMToken: async (data, token) => {
    return apiClient.post(API_ENDPOINTS.SET_FCM_TOKEN, data, token);
  },
};
