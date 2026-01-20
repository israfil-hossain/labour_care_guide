import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveDeclarePatient,
  saveDeclarePatientResponse,
} from "../reduxStates/DeclarePatient";

const { ApiService, apiCallTypes } = Api;

export function* pateintDeclare(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.DECLARE_PATIENT,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveDeclarePatient(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const pateintDeclareResponse = {
    status: false,
    message: data?.result?.message ?? "Invalid login credentials!!",
  };
  yield put(saveDeclarePatientResponse(pateintDeclareResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch pateintDeclare function
 */
export function* watchPateintDeclare() {
  yield takeLatest("DECLARE_PATIENT", pateintDeclare);
}
