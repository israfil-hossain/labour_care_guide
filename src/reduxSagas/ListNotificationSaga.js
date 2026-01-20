import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveListNotf,
  saveListNotfResponse,
} from "../reduxStates/ListNotification";

const { ApiService, apiCallTypes } = Api;

export function* notfList(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.NOTIFCATION_LIST,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveListNotf(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const notfListResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveListNotfResponse(notfListResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch notfList function
 */
export function* watchNotfList() {
  yield takeLatest("NOTIFCATION_LIST", notfList);
}
