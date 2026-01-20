import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveDecisionLcg,
  saveDecisionLcgResponse,
} from "../reduxStates/LcgDecision";

const { ApiService, apiCallTypes } = Api;

export function* lcgDecisionUpdate(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.LCG_DECISION,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveDecisionLcg(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const lcgDecisionUpdateResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveDecisionLcgResponse(lcgDecisionUpdateResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch lcgDecisionUpdate function
 */
export function* watchLcgDecisionUpdate() {
  yield takeLatest("LCG_DECISION", lcgDecisionUpdate);
}
