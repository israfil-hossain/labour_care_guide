import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveDashBoard, saveDashBoardResponse } from "../reduxStates/Dashboard";

const { ApiService, apiCallTypes } = Api;

export function* dashBoard(action) {
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.DASHBOARD,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveDashBoard(data?.result?.data));
    return;
  }

  const dashBoardResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveDashBoardResponse(dashBoardResponse));
}

/**
 * Watch dashBoard function
 */
export function* watchDashBoard() {
  yield takeLatest("DASHBOARD", dashBoard);
}
