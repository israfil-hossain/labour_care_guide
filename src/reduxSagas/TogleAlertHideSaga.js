import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveHideAlertStatus,
  saveHideAlertStatusResponse,
} from "../reduxStates/ToggleAlertHide";

const { ApiService, apiCallTypes } = Api;

export function* alertToggle(action) {
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.TOGGLE_ALERT_HIDE,
    action.payload
  );
  console.log("f",data?.result?.data)
  if (data.isSucceded) {
    yield put(saveHideAlertStatus(data?.result?.data));
    return;
  }

  const drugStatusToggleResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveHideAlertStatusResponse(drugStatusToggleResponse));
}

/**
 * Watch alertToggle function
 */
export function* watchAlertToggle() {
  yield takeLatest("TOGGLE_ALERT_HIDE", alertToggle);
}
