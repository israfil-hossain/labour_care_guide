import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveDetailRound,
  saveRoundPatientListPagnaited,
} from "../reduxStates/RoundDetail";
import {
  saveRoundSearchList,
  saveRoundSearchListResponse,
} from "../reduxStates/SearchPatientRound";

const { ApiService, apiCallTypes } = Api;

export function* roundSearch(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.SEARCH_ROUND_PATIENT,
    action.payload
  );
  
  if (data.isSucceded) {
    yield put(saveRoundSearchList(data?.result?.data?.data?.patients));
    yield put(saveDetailRound(data?.result?.data));
     yield put(saveRoundPatientListPagnaited(data?.result?.data?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const profileUpdateResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveRoundSearchListResponse(profileUpdateResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch roundSearch function
 */
export function* watchRoundSearch() {
  yield takeLatest("SEARCH_ROUND_PATIENT", roundSearch);
}
