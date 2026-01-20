import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveSetFCM, saveSetFCMResponse } from "../reduxStates/SetFcmToken";

const { ApiService, apiCallTypes } = Api;

export function* tokenFcmSet(action) {
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.SET_FCM_TOKEN,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveSetFCM(data?.result?.data));
    return;
  }

  const tokenFcmSetResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveSetFCMResponse(tokenFcmSetResponse));
}

/**
 * Watch tokenFcmSet function
 */
export function* watchTokenFcmSet() {
  yield takeLatest("SET_FCM_TOKEN", tokenFcmSet);
}
