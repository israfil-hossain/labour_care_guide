import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveProfileUpdate,
  saveProfileUpdateResponse,
} from "../reduxStates/ProfileUpdate";

const { ApiService, apiCallTypes } = Api;

export function* profileUpdate(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.UPDATE_PROFILE,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveProfileUpdate(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const profileUpdateResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveProfileUpdateResponse(profileUpdateResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch profileUpdate function
 */
export function* watchProfileUpdate() {
  yield takeLatest("UPDATE_PROFILE", profileUpdate);
}

