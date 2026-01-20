import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveLcgDetailList,
  saveLcgDetailListResponse,
} from "../reduxStates/LcgDetails";

const { ApiService, apiCallTypes } = Api;

export function* lcgDetails(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.GET_LCG_DETAILS,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveLcgDetailList(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const lcgDetailsResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveLcgDetailListResponse(lcgDetailsResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch lcgDetails function
 */
export function* watchLcgDetails() {
  yield takeLatest("GET_LCG_DETAILS", lcgDetails);
}
