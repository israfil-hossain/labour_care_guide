import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveNotfStatus,
  saveNotfStatusResponse,
} from "../reduxStates/ToggleNotfStatus";

const { ApiService, apiCallTypes } = Api;

export function* notfStatusToggle(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.NOTIFICATION_STATUS,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveNotfStatus(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const notfStatusToggleResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveNotfStatusResponse(notfStatusToggleResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch notfStatusToggle function
 */
export function* watchNotfStatusToggle() {
  yield takeLatest("NOTIFICATION_STATUS", notfStatusToggle);
}
