import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveLabourStatus,
  saveLabourStatusResponse,
} from "../reduxStates/UpdateLabourStatus";

const { ApiService, apiCallTypes } = Api;

export function* updateStatusLabour(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.UPDATE_LABOUR_STATUS,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveLabourStatus(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const updateStatusLabourResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveLabourStatusResponse(updateStatusLabourResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch updateStatusLabour function
 */
export function* watchUpdateStatusLabour() {
  yield takeLatest("UPDATE_LABOUR_STATUS", updateStatusLabour);
}
