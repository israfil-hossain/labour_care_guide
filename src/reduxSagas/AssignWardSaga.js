import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveWardAssign, saveWardAssignResponse } from "../reduxStates/AssignWard";

const { ApiService, apiCallTypes } = Api;

export function* wardAssign(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.ASSIGN_WARD,
    action.payload
  );

  if (data.isSucceded) {
    yield put(saveWardAssign(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const wardAssignResponse = {
    status: false,
    message: data?.result?.message ?? "Invalid login credentials!!",
  };
   yield put(saveWardAssignResponse(wardAssignResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch wardAssign function
 */
export function* watchWardAssign() {
  yield takeLatest("ASSIGN_WARD", wardAssign);
}
