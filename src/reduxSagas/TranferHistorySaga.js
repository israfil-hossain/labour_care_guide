import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveTransferHistory,
  saveTransferHistoryResponse,
} from "../reduxStates/TransferHistory";

const { ApiService, apiCallTypes } = Api;

export function* transferHistory(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.TRANSFER_LIST,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveTransferHistory(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const transferHistoryResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveTransferHistoryResponse(transferHistoryResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch transferHistory function
 */
export function* watchTransferHistory() {
  yield takeLatest("TRANSFER_LIST", transferHistory);
}
