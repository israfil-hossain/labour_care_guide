import Axios from "axios";
import * as ApiCalls from "./apiCalls";
import apiCallTypes from "./apiCallTypes";
import { User } from "../../reduxStates";
import environment from "../../config/environments/env.json";

// Store reference will be injected
let storeRef = null;

export const setStoreReference = (store) => {
  storeRef = store;
};

const getApiBaseUrl = () => environment?.API_URL ?? '';

const getErrorMessage = (excep) => {
  const data = excep.response?.data;
  let errMsg = data;
  if (data && typeof data !== "string") {
    errMsg = "Something went wrong. please try again!";
  }
  return errMsg;
};

export const httpPostRequest = async ({ apiUrl, jsonBody, apiType }) => {
  let data = jsonBody;
  let contentType = "application/json";
  if (
    apiType === "addPlan" ||
    apiType === "assignWard" ||
    apiType === "transferPatient" ||
    apiType === "declarePatient" ||
    apiType === "dischargePatient" ||
    apiType === "addDrug" ||
    apiType === "lcgDesicion"
  ) {
    data = PrepareFormData(jsonBody);
    contentType = "multipart/form-data";
  }
  const token = storeRef?.getState().user.authToken;
  const response = await Axios.post(apiUrl, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": contentType,
      Authorization: `Bearer ${token && token}`,
    },
  })
    .then(async (result) => {
      let isSucceded = false;
      if (result?.data?.success === true) {
        isSucceded = true;
      }
      return { result, isSucceded };
    })
    .catch((error) => {
      console.log("err", error?.response?.data?.message);
      if (error?.response?.status === 401) {
        storeRef?.dispatch(User.signOutAction());
        return {
          isSucceded: false,
          result: error?.response?.data,
          message: error?.response?.data?.message,
        };
      } else {
        return {
          isSucceded: false,
          result: error?.response?.data,
          message: error?.response?.data?.message,
        };
      }
    });
  return response;
};

export const httpGetRequest = async ({ apiUrl }) => {
  const token = storeRef?.getState().user.authToken;
  const response = await Axios.get(apiUrl, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token && token}`,
    },
  })
    .then(async (result) => {
      let isSucceded = false;
      if (result?.data?.success === true) {
        isSucceded = true;
      }
      return { result, isSucceded };
    })
    .catch((error) => {
      const excep = error;
      console.log("err", error?.response?.data?.message);
      if (error?.response?.status === 401) {
        storeRef?.dispatch(User.signOutAction());
        return {
          isSucceded: false,
          result: error?.response?.data,
          message: error?.response?.data?.message,
        };
      } else {
        return {
          isSucceded: false,
          result: error?.response?.data,
          message: error?.response?.data?.message,
        };
      }
    });
  return response;
};

export const PrepareFormData = (body) => {
  try {
    const formData = new FormData();
    if (typeof body === "object") {
      const keys = Object.keys(body);
      keys.forEach((key) => {
        if (Array.isArray(body[key])) {
          for (let index = 0; index < body[key].length; index++) {
            let element = body[key][index];
            formData.append(`${key}`, element);
          }
        } else {
          formData.append(key, body[key]);
        }
      });
      console.log("FormData",formData)
      return formData;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const callApiService = async (apiType, jsonBody) => {
  const request = ApiCalls.apiCalls({ apiType });
  let apiUrl = request.requestUrl;
  if (request.requestType === "POST") {
    console.log("Post", jsonBody, apiUrl);
    const req = await httpPostRequest({ apiUrl, jsonBody, apiType });
    return req;
  }
  if (request.requestType === "GET") {
    if (jsonBody.uri) {
      if (apiType == "filterRound" || apiType == "filterStaff") {
        const extraUriStr = `${jsonBody.uri}`;
        apiUrl = `${apiUrl}${extraUriStr}`;
      } else {
        const extraUriStr = `/${jsonBody.uri}`;
        console.log("extraUriStr", extraUriStr);
        apiUrl = `${apiUrl}${extraUriStr}`;
      }
    }

    console.log("Get ", apiUrl);

    const req = await httpGetRequest({ apiUrl });
    return req;
  }
  return { message: "error" };
};
