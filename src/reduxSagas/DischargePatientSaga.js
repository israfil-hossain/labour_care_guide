import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveDischargePatient,
  saveDischargePatientResponse,
} from "../reduxStates/DischargePatient";

const { ApiService, apiCallTypes } = Api;

export function* pateintDischarge(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.DISCHARGE_PATIENT,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveDischargePatient(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const pateintDischargeResponse = {
    status: false,
    message: data?.result?.message ?? "Invalid login credentials!!",
  };
  yield put(saveDischargePatientResponse(pateintDischargeResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch pateintDischarge function
 */
export function* watchPateintDischarge() {
  yield takeLatest("DISCHARGE_PATIENT", pateintDischarge);
}
