import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveBishopScore,
  saveBishopScoreResponse,
} from "../reduxStates/BishopScore";

const { ApiService, apiCallTypes } = Api;

export function* scoreBiShop(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.ADD_BISHOP_SCORE,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveBishopScore(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const biShopResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveBishopScoreResponse(biShopResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch scoreBiShop function
 */
export function* watchScoreBishop() {
  yield takeLatest("ADD_BISHOP_SCORE", scoreBiShop);
}
