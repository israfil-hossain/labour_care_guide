import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveLcgAdd,
  saveLcgAddResponse,
} from "../reduxStates/AddLCG";

const { ApiService, apiCallTypes } = Api;

export function* lcgAdd(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.ADD_LCG,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveLcgAdd(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const lcgAddResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveLcgAddResponse(lcgAddResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch lcgAdd function
 */
export function* watchLcgAdd() {
  yield takeLatest("ADD_LCG", lcgAdd);
}
