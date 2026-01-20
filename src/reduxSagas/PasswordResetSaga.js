import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveResetPass,
  saveResetPassResponse,
} from "../reduxStates/PasswordReset";

const { ApiService, apiCallTypes } = Api;

export function* resetPassword(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.RESET_PASSWORD,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveResetPass(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const resetPassResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveResetPassResponse(resetPassResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch resetPassword function
 */
export function* watchResetPassword() {
  yield takeLatest("RESET_PASSWORD", resetPassword);
}
