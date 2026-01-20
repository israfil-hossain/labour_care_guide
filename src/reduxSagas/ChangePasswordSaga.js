import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  savePassChange,
  savePassChangeResponse,
} from "../reduxStates/ChangePassword";

const { ApiService, apiCallTypes } = Api;

export function* changePass(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.CHANGE_PASSWORD,
    action.payload
  );
  if (data.isSucceded) {
    yield put(savePassChange(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const changePassResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(savePassChangeResponse(changePassResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch changePass function
 */
export function* watchChangePass() {
  yield takeLatest("CHANGE_PASSWORD", changePass);
}
