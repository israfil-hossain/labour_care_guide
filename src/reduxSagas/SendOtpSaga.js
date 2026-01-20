import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveSendOtp, saveSendOtpResponse } from "../reduxStates/SendOtp";

const { ApiService, apiCallTypes } = Api;

export function* otpSend(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.SEND_OTP,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveSendOtp(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const otpSendResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveSendOtpResponse(otpSendResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch otpSend function
 */
export function* watchOtpSend() {
  yield takeLatest("SEND_OTP", otpSend);
}
