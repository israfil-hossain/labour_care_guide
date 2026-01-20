import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveDelCompleted,
  saveDelCompletedResponse,
} from "../reduxStates/DeliveryCompleted";

const { ApiService, apiCallTypes } = Api;

export function* deliveryComplete(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.DELIVERY_COMPLETED,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveDelCompleted(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const deliCompleteResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveDelCompletedResponse(deliCompleteResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch deliveryComplete function
 */
export function* watchDeliveryComplete() {
  yield takeLatest("DELIVERY_COMPLETED", deliveryComplete);
}
