import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveStaffsearchList,
  saveStaffSearchListResponse,
} from "../reduxStates/SearchStaff";
import {
  saveStaffList,
  saveStaffListPagnaited,
} from "../reduxStates/ListStaff";

const { ApiService, apiCallTypes } = Api;

export function* searchStaff(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.SEARCH_STAFF,
    action.payload
  );
 console.log('da',data?.result?.data?.data?.staffs)
  if (data.isSucceded) {
    yield put(saveStaffsearchList(data?.result?.data?.data?.staffs));
    yield put(saveStaffListPagnaited(data?.result?.data?.data?.staffs));
    yield put(UI.showLoader(false));
    return;
  }

  const searchStaffResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveStaffSearchListResponse(searchStaffResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch searchStaff function
 */
export function* watchSearchStaff() {
  yield takeLatest("SEARCH_STAFF", searchStaff);
}
