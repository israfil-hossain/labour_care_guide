import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveDrugStatus,
  saveDrugStatusResponse,
} from "../reduxStates/ToggleDrugStatus";

const { ApiService, apiCallTypes } = Api;

export function* drugStatusToggle(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.TOGGLE_DRUG_STATUS,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveDrugStatus(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const drugStatusToggleResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveDrugStatusResponse(drugStatusToggleResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch drugStatusToggle function
 */
export function* watchDrugStatusToggle() {
  yield takeLatest("TOGGLE_DRUG_STATUS", drugStatusToggle);
}
