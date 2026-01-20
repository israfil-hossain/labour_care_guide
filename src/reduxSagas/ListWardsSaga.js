import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveWardList,
  saveWardListResponse,
  saveWardListPagnaited
} from "../reduxStates/ListWard";

const { ApiService, apiCallTypes } = Api;

export function* wardsList(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.WARD_LIST,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveWardList(data?.result?.data));
    yield put(saveWardListPagnaited(data?.result?.data?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const wardListResponse = {
    status: false,
    message: data?.result?.message ?? "Invalid login credentials!!",
  };
  yield put(saveWardListResponse(wardListResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch wardsList function
 */
export function* watchWardsList() {
  yield takeLatest("WARD_LIST", wardsList);
}
