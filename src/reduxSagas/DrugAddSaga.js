import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveDrugAdd, saveDrugAddResponse } from "../reduxStates/DrugAdd";

const { ApiService, apiCallTypes } = Api;

export function* drugAdd(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.ADD_DRUG,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveDrugAdd(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const drugAddResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveDrugAddResponse(drugAddResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch drugAdd function
 */
export function* watchDrugAdd() {
  yield takeLatest("ADD_DRUG", drugAdd);
}
