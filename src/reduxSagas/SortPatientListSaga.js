import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveSortPatientList,
  saveSortPatientListResponse,
} from "../reduxStates/SortPatients";

const { ApiService, apiCallTypes } = Api;

export function* sortPatientList(action) {
  yield put(UI.showLoader(true));
  //console.log("action.payload", action.payload);
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.SORT_PATIENT_LIST,
    action.payload
  );
  console.log("Sort Patient Data", data?.result?.data);
  if (data.isSucceded) {
    yield put(saveSortPatientList(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const sortPatientResponse = {
    status: false,
    message: data?.result?.message ?? "Invalid login credentials!!",
  };
  yield put(saveSortPatientListResponse(sortPatientResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch sortPatientList function
 */
export function* watchSortPatientList() {
  yield takeLatest("SORT_PATIENT_LIST", sortPatientList);
}
