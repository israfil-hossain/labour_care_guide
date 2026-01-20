import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveBabyList, saveBabyListResponse } from "../reduxStates/BabyList";

const { ApiService, apiCallTypes } = Api;

export function* babyList(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.BABY_LIST,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveBabyList(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const babyListResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveBabyListResponse(babyListResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch babyList function
 */
export function* watchBabyList() {
  yield takeLatest("BABY_LIST", babyList);
}
