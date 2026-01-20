import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveTransferPatient,
  saveTransferPatientResponse,
} from "../reduxStates/TransferPatient";

const { ApiService, apiCallTypes } = Api;

export function* pateintTransfer(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.TRANSFER_PATIENT,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveTransferPatient(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const pateintTransferResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveTransferPatientResponse(pateintTransferResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch pateintTransfer function
 */
export function* watchPateintTransfer() {
  yield takeLatest("TRANSFER_PATIENT", pateintTransfer);
}
