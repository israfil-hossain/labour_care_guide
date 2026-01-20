import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  savePassForgot,
  savePassForgotResponse,
} from "../reduxStates/ForgotPassword";

const { ApiService, apiCallTypes } = Api;

export function* forgetPass(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.FORGOT_PASSWORD,
    action.payload
  );
  if (data.isSucceded) {
    yield put(savePassForgot(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const forgetPassResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(savePassForgotResponse(forgetPassResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch forgetPass function
 */
export function* watchForgetPass() {
  yield takeLatest("FORGOT_PASSWORD", forgetPass);
}
