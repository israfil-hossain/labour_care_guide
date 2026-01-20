import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveApgarScore,
  saveApgarScoreResponse,
} from "../reduxStates/ApgarScore";

const { ApiService, apiCallTypes } = Api;

export function* scoreApgar(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.ADD_APGAR_SCORE,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveApgarScore(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const apgarResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveApgarScoreResponse(apgarResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch scoreApgar function
 */
export function* watchScoreApgar() {
  yield takeLatest("ADD_APGAR_SCORE", scoreApgar);
}
