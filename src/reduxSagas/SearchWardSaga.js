import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveWardsearchList,
  saveWardSearchListResponse,
} from "../reduxStates/SearchWard";
import {
    saveWardList,
    saveWardListPagnaited,
    saveWardListResponse,
  } from "../reduxStates/ListWard";

const { ApiService, apiCallTypes } = Api;

export function* searchWard(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.SEARCH_WARD,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveWardList(data?.result?.data));
    yield put(saveWardListPagnaited(data?.result?.data));
    yield put(saveWardsearchList(data?.result?.data?.data?.wards));
    yield put(UI.showLoader(false));
    return;
  }

  const searchWardResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveWardSearchListResponse(searchWardResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch searchWard function
 */
export function* watchSearchWard() {
  yield takeLatest("SEARCH_WARD", searchWard);
}
