import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveStaffList,
  saveStaffListPagnaited,
  saveStaffListResponse,
} from "../reduxStates/ListStaff";

const { ApiService, apiCallTypes } = Api;

export function* staffList(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.STAFF_LIST,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveStaffList(data?.result?.data));
    yield put(saveStaffListPagnaited(data?.result?.data?.data?.staffs));
    yield put(UI.showLoader(false));
    return;
  }

  const staffListResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveStaffListResponse(staffListResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch staffList function
 */
export function* watchStaffList() {
  yield takeLatest("STAFF_LIST", staffList);
}
