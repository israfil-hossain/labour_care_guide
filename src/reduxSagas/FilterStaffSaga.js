import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveStaffList, saveStaffListPagnaited, saveStaffListResponse } from "../reduxStates/ListStaff";
import {
  saveFilterStaff,
  saveFilterStaffResponse,
} from "../reduxStates/FilterStaff";

const { ApiService, apiCallTypes } = Api;

export function* staffFilter(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.FILTER_STAFF,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveStaffListPagnaited(data?.result?.data?.data?.staffs));
    yield put(saveFilterStaff(data?.result?.data?.data?.staffs));
    yield put(UI.showLoader(false));
    return;
  }

  const staffFilterResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveFilterStaffResponse(staffFilterResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch staffFilter function
 */
export function* watchStaffFilter() {
  yield takeLatest("FILTER_STAFF", staffFilter);
}
