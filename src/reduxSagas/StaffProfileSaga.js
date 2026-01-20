import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveProfileDetail,
  saveProfileDetailResponse,
} from "../reduxStates/StaffProfile";

const { ApiService, apiCallTypes } = Api;

export function* profileUser(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.STAFF_PROFILE,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveProfileDetail(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const profileUserResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveProfileDetailResponse(profileUserResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch profileUser function
 */
export function* watchProfileUser() {
  yield takeLatest("STAFF_PROFILE", profileUser);
}

