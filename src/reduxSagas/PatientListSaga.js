import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  savePatientList,
  savePatientListPagnaited,
  savePatientListResponse,
} from "../reduxStates/PatientList";

const { ApiService, apiCallTypes } = Api;

export function* listPatient(action) {
  yield put(UI.showLoader(true));

  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.PATEINT_LIST,
    action.payload
  );


  if (data.isSucceded) {
    yield put(savePatientList(data?.result?.data));
    yield put(savePatientListPagnaited(data?.result?.data?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const listPatientResponse = {
    status: false,
    message: data?.result?.message ?? "Invalid login credentials!!",
  };
  yield put(savePatientListResponse(listPatientResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch listPatient function
 */
export function* watchListPatient() {
  yield takeLatest("PATEINT_LIST", listPatient);
}
