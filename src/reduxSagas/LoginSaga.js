import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveUserLogin, saveLoginResponse,saveUserAuthToken } from "../reduxStates/User";

const { ApiService, apiCallTypes } = Api;

export function* login(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.LOGIN,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserLogin(data?.result?.data));
    yield put(saveUserAuthToken(data?.result?.headers?.authorization))
    yield put(UI.showLoader(false));
    return;
  }

  const loginResponse = {
    status: false,
    message: data?.result?.message ?? "Invalid login credentials!!",
  };
  yield put(saveLoginResponse(loginResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch login function
 */
export function* watchLogin() {
  yield takeLatest("LOGIN", login);
}
