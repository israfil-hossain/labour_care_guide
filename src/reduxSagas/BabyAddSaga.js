import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveAddBaby, saveAddBabyResponse } from "../reduxStates/BabyAdd";

const { ApiService, apiCallTypes } = Api;

export function* babyAdd(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.ADD_BABY,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveAddBaby(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const babyAddResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveAddBabyResponse(babyAddResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch babyAdd function
 */
export function* watchBabyAdd() {
  yield takeLatest("ADD_BABY", babyAdd);
}
