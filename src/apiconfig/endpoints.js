// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/sign-in/email',
  SIGN_OUT: '/auth/sign-out',
  FORGOT_PASSWORD: '/staff/auth/v1/send-otp',
  RESET_PASSWORD: '/staff/auth/v1/reset-password',
  CHANGE_PASSWORD: '/staff/account/v1/change-password',

  // Ward endpoints
  WARDS: '/wards',
  WARD_BY_ID: (id) => `/wards/${id}`,

  // Patient endpoints
  PATIENTS: '/staff/patient/v1',
  PATIENT_BY_ID: (id) => `/staff/patient/v1/single?patientId=${id}`,
  PATIENT_DETAILS: '/staff/patient/v1/single',
  TRANSFER_PATIENT: '/staff/patient/v1/transfer-patient',
  DECLARE_PATIENT: '/staff/patient/v1/declare',
  DISCHARGE_PATIENT: '/staff/patient/v1/discharge',
  TOGGLE_HIGH_RISK: '/staff/patient/v1/toggle-highrisk',

  // Staff endpoints
  STAFFS: '/staff/account/v1/staff-list',
  STAFF_PROFILE: '/staff/account/v1/profile',
  UPDATE_PROFILE: '/staff/account/v1/edit-profile',
  TOGGLE_DUTY_STATUS: '/staff/account/v1/toggle-duty-status',
  TOGGLE_NOTIFICATION_STATUS: '/staff/account/v1/toggle-notification-status',
  TOGGLE_ALERT_HIDE: '/staff/account/v1/toggle-high-risk-alert-hide-status',

  // Dashboard
  DASHBOARD: '/staff/account/v1',

  // Plan endpoints
  ADD_PLAN: '/staff/plan/v1',
  GET_PLAN_LIST: '/staff/patient/v1/plans',

  // Bishop Score
  ADD_BISHOP_SCORE: '/staff/patient/v1/add-bishop-score',

  // Parity
  PARITY_DETAIL: '/staff/patient/v1/parities',

  // Transfer History
  TRANSFER_LIST: '/staff/patient/v1/transfers',

  // Labour
  UPDATE_LABOUR_STATUS: '/staff/patient/v1/active-labour',

  // LCG
  ADD_LCG: '/staff/patient/v1/add-lcg',
  GET_LCG_DETAILS: '/staff/patient/v1/lcg',
  LCG_DECISION: '/staff/patient/v1/lcg-decision',
  VIEW_LCG: '/staff/patient/v1/lcg-report',

  // Delivery
  DELIVERY_COMPLETED: '/staff/patient/v1/delivery-complete',

  // Baby
  ADD_BABY: '/staff/patient/v1/add-baby',
  BABY_LIST: '/staff/patient/v1/babies',
  ADD_APGAR_SCORE: '/staff/patient/v1/add-baby-apgar-score',

  // Drug
  DRUG_CATEGORY_LIST: '/public/v1/drug-category',
  ADD_DRUG: '/staff/patient/v1/add-drug',
  DRUG_HISTORY_LIST: '/staff/patient/v1/drugs',
  TOGGLE_DRUG_STATUS: '/staff/patient/v1/toggle-drug-status',

  // Round
  ROUND_DETAIL: '/staff/patient/v1/round-tab',

  // FCM Token
  SET_FCM_TOKEN: '/staff/account/v1/set-fcm-token',

  // Notifications
  NOTIFICATION_LIST: '/staff/account/v1/notification',
};

// Helper function to build query strings
export const buildQueryString = (params) => {
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
