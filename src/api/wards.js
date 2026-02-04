import { apiClient } from '../apiconfig/apiClient';
import { API_ENDPOINTS, buildQueryString } from '../apiconfig/endpoints';

/**
 * Wards API functions
 */
export const wardsApi = {
  /**
   * Get all wards with pagination and search
   * @param {Object} params
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.search - Search query
   * @param {string} token - Auth token
   * @returns {Promise<Object>} Response with wards data
   */
  getAll: async (params, token) => {
    const queryString = buildQueryString(params);
    return apiClient.get(`${API_ENDPOINTS.WARDS}${queryString}`, token);
  },

  /**
   * Get ward by ID
   * @param {string} id - Ward ID
   * @param {string} token - Auth token
   * @returns {Promise<Object>}
   */
  getById: async (id, token) => {
    return apiClient.get(API_ENDPOINTS.WARD_BY_ID(id), token);
  },

  /**
   * Create a new ward
   * @param {Object} data - Ward data
   * @param {string} token - Auth token
   * @returns {Promise<Object>}
   */
  create: async (data, token) => {
    return apiClient.post(API_ENDPOINTS.WARDS, data, token);
  },

  /**
   * Update a ward
   * @param {string} id - Ward ID
   * @param {Object} data - Ward data
   * @param {string} token - Auth token
   * @returns {Promise<Object>}
   */
  update: async (id, data, token) => {
    return apiClient.put(API_ENDPOINTS.WARD_BY_ID(id), data, token);
  },

  /**
   * Delete a ward
   * @param {string} id - Ward ID
   * @param {string} token - Auth token
   * @returns {Promise<Object>}
   */
  delete: async (id, token) => {
    return apiClient.delete(API_ENDPOINTS.WARD_BY_ID(id), token);
  },
};
