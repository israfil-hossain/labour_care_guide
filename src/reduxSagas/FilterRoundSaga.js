import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveDetailRound, saveRoundPatientListPagnaited } from "../reduxStates/RoundDetail";
import {
  saveFilterRound,
  saveFilterRoundResponse,
} from "../reduxStates/FilterRoundPatient";

const { ApiService, apiCallTypes } = Api;

export function* roundPatientFilter(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.FILTER_ROUND,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveFilterRound(data?.result?.data?.data?.patients));
    yield put(saveDetailRound(data?.result?.data));
    yield put(saveRoundPatientListPagnaited(data?.result?.data?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const roundPatientFilterResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveFilterRoundResponse(roundPatientFilterResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch roundPatientFilter function
 */
export function* watchRoundPatientFilter() {
  yield takeLatest("FILTER_ROUND", roundPatientFilter);
}
