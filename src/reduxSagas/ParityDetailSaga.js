import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveListParity,
  saveListParityResponse,
} from "../reduxStates/ParityDetail";

const { ApiService, apiCallTypes } = Api;

export function* listParity(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.PARITY_DETAIL,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveListParity(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const listParityResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveListParityResponse(listParityResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch listParity function
 */
export function* watchListParity() {
  yield takeLatest("PARITY_DETAIL", listParity);
}
