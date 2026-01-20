import apiCallTypes from "./apiCallTypes";
import apiContainersUrl from "./apiUrl";

export const apiCalls = ({ apiType }) => {
  let requestType = "";
  let requestUrl = "";
  switch (apiType) {
    /* -------------------------------- POST REQUESTS BEGINS ----------------------------------  */
    /* POST request */
    case apiCallTypes.LOGIN:
      requestType = "POST";
      requestUrl = apiContainersUrl.LOGIN_URL;
      break;

    case apiCallTypes.ADD_PATIENT:
      requestType = "POST";
      requestUrl = apiContainersUrl.ADD_PATIENT;
      break;

    case apiCallTypes.ADD_PLAN:
      requestType = "POST";
      requestUrl = apiContainersUrl.ADD_PLAN;
      break;

    case apiCallTypes.ASSIGN_WARD:
      requestType = "POST";
      requestUrl = apiContainersUrl.ASSIGN_WARD;
      break;

    case apiCallTypes.TRANSFER_PATIENT:
      requestType = "POST";
      requestUrl = apiContainersUrl.TRANSFER_PATIENT;
      break;

    case apiCallTypes.DECLARE_PATIENT:
      requestType = "POST";
      requestUrl = apiContainersUrl.DECLARE_PATIENT;
      break;

    case apiCallTypes.DISCHARGE_PATIENT:
      requestType = "POST";
      requestUrl = apiContainersUrl.DISCHARGE_PATIENT;
      break;

    case apiCallTypes.SEND_OTP:
      requestType = "POST";
      requestUrl = apiContainersUrl.SEND_OTP;
      break;

    case apiCallTypes.FORGOT_PASSWORD:
      requestType = "POST";
      requestUrl = apiContainersUrl.FORGOT_PASSWORD;
      break;

    case apiCallTypes.RESET_PASSWORD:
      requestType = "POST";
      requestUrl = apiContainersUrl.RESET_PASSWORD;
      break;

    case apiCallTypes.ADD_BISHOP_SCORE:
      requestType = "POST";
      requestUrl = apiContainersUrl.ADD_BISHOP_SCORE;
      break;

    case apiCallTypes.UPDATE_LABOUR_STATUS:
      requestType = "POST";
      requestUrl = apiContainersUrl.UPDATE_LABOUR_STATUS;
      break;

    case apiCallTypes.ADD_LCG:
      requestType = "POST";
      requestUrl = apiContainersUrl.ADD_LCG;
      break;

    case apiCallTypes.DELIVERY_COMPLETED:
      requestType = "POST";
      requestUrl = apiContainersUrl.DELIVERY_COMPLETED;
      break;

    case apiCallTypes.ADD_BABY:
      requestType = "POST";
      requestUrl = apiContainersUrl.ADD_BABY;
      break;

    case apiCallTypes.ADD_APGAR_SCORE:
      requestType = "POST";
      requestUrl = apiContainersUrl.ADD_APGAR_SCORE;
      break;

    case apiCallTypes.ADD_DRUG:
      requestType = "POST";
      requestUrl = apiContainersUrl.ADD_DRUG;
      break;

    case apiCallTypes.LCG_DECISION:
      requestType = "POST";
      requestUrl = apiContainersUrl.LCG_DECISION;
      break;

    case apiCallTypes.UPDATE_PROFILE:
      requestType = "POST";
      requestUrl = apiContainersUrl.UPDATE_PROFILE;
      break;

    case apiCallTypes.CHANGE_PASSWORD:
      requestType = "POST";
      requestUrl = apiContainersUrl.CHANGE_PASSWORD;
      break;

    case apiCallTypes.SET_FCM_TOKEN:
      requestType = "POST";
      requestUrl = apiContainersUrl.SET_FCM_TOKEN;
      break;
    /* -------------------------------- POST REQUESTS ENDS ----------------------------------  */

    /* GET request */
    case apiCallTypes.WARD_LIST:
      requestType = "GET";
      requestUrl = apiContainersUrl.WARD_LIST;
      break;

    case apiCallTypes.PATEINT_LIST:
      requestType = "GET";
      requestUrl = apiContainersUrl.PATEINT_LIST;
      break;

    case apiCallTypes.SEARCH_PATIENT:
      requestType = "GET";
      requestUrl = apiContainersUrl.SEARCH_PATIENT;
      break;

    case apiCallTypes.SORT_PATIENT_LIST:
      requestType = "GET";
      requestUrl = apiContainersUrl.SORT_PATIENT_LIST;
      break;

    case apiCallTypes.HIGH_RISK_PATIENT:
      requestType = "GET";
      requestUrl = apiContainersUrl.HIGH_RISK_PATIENT;
      break;

    case apiCallTypes.SEARCH_WARD:
      requestType = "GET";
      requestUrl = apiContainersUrl.SEARCH_WARD;
      break;

    case apiCallTypes.STAFF_LIST:
      requestType = "GET";
      requestUrl = apiContainersUrl.STAFF_LIST;
      break;

    case apiCallTypes.SEARCH_STAFF:
      requestType = "GET";
      requestUrl = apiContainersUrl.SEARCH_STAFF;
      break;

    case apiCallTypes.FILTER_STAFF:
      requestType = "GET";
      requestUrl = apiContainersUrl.FILTER_STAFF;
      break;

    case apiCallTypes.DASHBOARD:
      requestType = "GET";
      requestUrl = apiContainersUrl.DASHBOARD;
      break;

    case apiCallTypes.PARITY_DETAIL:
      requestType = "GET";
      requestUrl = apiContainersUrl.PARITY_DETAIL;
      break;

    case apiCallTypes.GET_PLAN_LIST:
      requestType = "GET";
      requestUrl = apiContainersUrl.GET_PLAN_LIST;
      break;

    case apiCallTypes.TRANSFER_LIST:
      requestType = "GET";
      requestUrl = apiContainersUrl.TRANSFER_LIST;
      break;

    case apiCallTypes.BABY_LIST:
      requestType = "GET";
      requestUrl = apiContainersUrl.BABY_LIST;
      break;

    case apiCallTypes.DRUG_CATEGORY_LIST:
      requestType = "GET";
      requestUrl = apiContainersUrl.DRUG_CATEGORY_LIST;
      break;

    case apiCallTypes.DRUG_HISTORY_LIST:
      requestType = "GET";
      requestUrl = apiContainersUrl.DRUG_HISTORY_LIST;
      break;

    case apiCallTypes.TOGGLE_DRUG_STATUS:
      requestType = "GET";
      requestUrl = apiContainersUrl.TOGGLE_DRUG_STATUS;
      break;

    case apiCallTypes.GET_LCG_DETAILS:
      requestType = "GET";
      requestUrl = apiContainersUrl.GET_LCG_DETAILS;
      break;

    case apiCallTypes.TOGGLE_DUTY_STATUS:
      requestType = "GET";
      requestUrl = apiContainersUrl.TOGGLE_DUTY_STATUS;
      break;

    case apiCallTypes.NOTIFICATION_STATUS:
      requestType = "GET";
      requestUrl = apiContainersUrl.NOTIFICATION_STATUS;
      break;

    case apiCallTypes.STAFF_PROFILE:
      requestType = "GET";
      requestUrl = apiContainersUrl.STAFF_PROFILE;
      break;

    case apiCallTypes.PATEINT_DETAIL:
      requestType = "GET";
      requestUrl = apiContainersUrl.PATEINT_DETAIL;
      break;

    case apiCallTypes.ROUND_DETAIL:
      requestType = "GET";
      requestUrl = apiContainersUrl.ROUND_DETAIL;
      break;

    case apiCallTypes.FILTER_ROUND:
      requestType = "GET";
      requestUrl = apiContainersUrl.FILTER_ROUND;
      break;

    case apiCallTypes.SEARCH_ROUND_PATIENT:
      requestType = "GET";
      requestUrl = apiContainersUrl.SEARCH_ROUND_PATIENT;
      break;

    case apiCallTypes.NOTIFCATION_LIST:
      requestType = "GET";
      requestUrl = apiContainersUrl.NOTIFCATION_LIST;
      break;

    case apiCallTypes.VIEW_LCG:
      requestType = "GET";
      requestUrl = apiContainersUrl.VIEW_LCG;
      break;

    case apiCallTypes.TOGGLE_ALERT_HIDE:
      requestType = "GET";
      requestUrl = apiContainersUrl.TOGGLE_ALERT_HIDE;
      break;

    default:
      requestType = "";
      requestUrl = "";
      break;
  }
  return { requestType, requestUrl };
};
