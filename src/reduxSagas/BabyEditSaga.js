import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveEditBaby, saveEditBabyResponse } from "../reduxStates/BabyEdit";

const { ApiService, apiCallTypes } = Api;

export function* babyEdit(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.ADD_BABY,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveEditBaby(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const babyEditResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveEditBabyResponse(babyEditResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch babyEdit function
 */
export function* watchBabyEdit() {
  yield takeLatest("EDIT_BABY", babyEdit);
}
