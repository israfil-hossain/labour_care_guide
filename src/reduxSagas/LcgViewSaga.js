import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveLcgReport, saveLcgReportResponse } from "../reduxStates/LcgView";

const { ApiService, apiCallTypes } = Api;

export function* lcgReport(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.VIEW_LCG,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveLcgReport(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const lcgReportResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveLcgReportResponse(lcgReportResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch lcgReport function
 */
export function* watchLcgReport() {
  yield takeLatest("VIEW_LCG", lcgReport);
}
