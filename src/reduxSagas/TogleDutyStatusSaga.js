import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveDutyStatus,
  saveDutyStatusResponse,
} from "../reduxStates/ToggleDutyStatus";

const { ApiService, apiCallTypes } = Api;

export function* dutyStatusToggle(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.TOGGLE_DUTY_STATUS,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveDutyStatus(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const dutyStatusToggleResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveDutyStatusResponse(dutyStatusToggleResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch dutyStatusToggle function
 */
export function* watchDutyStatusToggle() {
  yield takeLatest("TOGGLE_DUTY_STATUS", dutyStatusToggle);
}
