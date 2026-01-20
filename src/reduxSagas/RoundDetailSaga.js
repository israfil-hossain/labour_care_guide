import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveDetailRound,
  saveRoundPatientListPagnaited,
  saveDetailRoundResponse,
} from "../reduxStates/RoundDetail";

const { ApiService, apiCallTypes } = Api;

export function* roundDetail(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.ROUND_DETAIL,
    action.payload
  );

  if (data.isSucceded) {
    yield put(saveDetailRound(data?.result?.data));
    yield put(saveRoundPatientListPagnaited(data?.result?.data?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const profileUpdateResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveDetailRoundResponse(profileUpdateResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch roundDetail function
 */
export function* watchRoundDetail() {
  yield takeLatest("ROUND_DETAIL", roundDetail);
}
