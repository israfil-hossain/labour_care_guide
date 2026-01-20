import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveHighRiskpatient,
  saveHighRiskpatientResponse,
} from "../reduxStates/HighRiskPatient";

const { ApiService, apiCallTypes } = Api;

export function* highPatientRisk(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.HIGH_RISK_PATIENT,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveHighRiskpatient(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const highPatientRiskResponse = {
    status: false,
    message: data?.result?.message ?? "Invalid login credentials!!",
  };
  yield put(saveHighRiskpatientResponse(highPatientRiskResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch highPatientRisk function
 */
export function* watchHighPatientRisk() {
  yield takeLatest("HIGH_RISK_PATIENT", highPatientRisk);
}
