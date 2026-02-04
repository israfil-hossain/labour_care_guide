import { apiClient } from '../apiconfig/apiClient';
import { API_ENDPOINTS, buildQueryString } from '../apiconfig/endpoints';

/**
 * Get patients list with filters and pagination
 * @param {Object} params - Query parameters
 * @param {string} params.filterBy - Filter field (e.g., 'highRisk', 'activeLabour')
 * @param {string} params.filterValue - Filter value
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.wardId - Ward ID filter
 * @param {string} params.search - Search term
 * @param {string} token - Auth token
 */
export const getPatients = (params = {}, token) => {
  const queryString = buildQueryString(params);
  return apiClient.get(`${API_ENDPOINTS.PATIENTS}${queryString}`, token);
};

/**
 * Get patient by ID
 * @param {string} patientId - Patient ID
 * @param {string} token - Auth token
 */
export const getPatientById = (patientId, token) => {
  return apiClient.get(`${API_ENDPOINTS.PATIENT_BY_ID(patientId)}`, token);
};

/**
 * Get patient details
 * @param {string} patientId - Patient ID
 * @param {string} token - Auth token
 */
export const getPatientDetails = (patientId, token) => {
  return apiClient.get(`${API_ENDPOINTS.PATIENT_DETAILS}?patientId=${patientId}`, token);
};

/**
 * Add new patient
 * @param {Object} data - Patient data
 * @param {string} token - Auth token
 */
export const addPatient = (data, token) => {
  return apiClient.post(API_ENDPOINTS.PATIENTS, data, token);
};

/**
 * Transfer patient
 * @param {Object} data - Transfer data
 * @param {string} token - Auth token
 */
export const transferPatient = (data, token) => {
  return apiClient.post(API_ENDPOINTS.TRANSFER_PATIENT, data, token);
};

/**
 * Declare patient
 * @param {Object} data - Declaration data
 * @param {string} token - Auth token
 */
export const declarePatient = (data, token) => {
  return apiClient.post(API_ENDPOINTS.DECLARE_PATIENT, data, token);
};

/**
 * Discharge patient
 * @param {Object} data - Discharge data
 * @param {string} token - Auth token
 */
export const dischargePatient = (data, token) => {
  return apiClient.post(API_ENDPOINTS.DISCHARGE_PATIENT, data, token);
};

/**
 * Toggle high risk status
 * @param {Object} data - Data with patientId and highRisk status
 * @param {string} token - Auth token
 */
export const toggleHighRisk = (data, token) => {
  return apiClient.post(API_ENDPOINTS.TOGGLE_HIGH_RISK, data, token);
};

/**
 * Search patients
 * @param {Object} params - Search parameters
 * @param {string} params.search - Search term
 * @param {string} token - Auth token
 */
export const searchPatients = (params, token) => {
  const queryString = buildQueryString(params);
  return apiClient.get(`${API_ENDPOINTS.PATIENTS}/search${queryString}`, token);
};
