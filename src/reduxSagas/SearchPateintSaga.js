import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveSearchList,
  saveSearchListResponse,
} from "../reduxStates/PatientSearch";
import {
  savePatientList,
  savePatientListPagnaited,
  savePatientListResponse,
} from "../reduxStates/PatientList";

const { ApiService, apiCallTypes } = Api;

export function* searchPatient(action) {
  yield put(UI.showLoader(true));
  //console.log("action.payload", action.payload);
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.SEARCH_PATIENT,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveSearchList(data?.result?.data?.data?.patients));
    yield put(savePatientList(data?.result?.data));
    yield put(savePatientListPagnaited(data?.result?.data?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const searchPatientResponse = {
    status: false,
    message: data?.result?.message ?? "Invalid login credentials!!",
  };
  yield put(saveSearchListResponse(searchPatientResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch searchPatient function
 */
export function* watchSearchPatient() {
  yield takeLatest("SEARCH_PATIENT", searchPatient);
}
