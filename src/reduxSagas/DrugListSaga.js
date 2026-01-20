import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveDrugList,
  saveDrugListResponse,
} from "../reduxStates/DrugList";

const { ApiService, apiCallTypes } = Api;

export function* drugList(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.DRUG_HISTORY_LIST,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveDrugList(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const drugListResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveDrugListResponse(drugListResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch drugList function
 */
export function* watchDrugList() {
  yield takeLatest("DRUG_HISTORY_LIST", drugList);
}
