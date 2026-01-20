import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveDrugCategoryList,
  saveDrugCategoryListResponse,
} from "../reduxStates/ListDrugCategory";

const { ApiService, apiCallTypes } = Api;

export function* drugCategoryList(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.DRUG_CATEGORY_LIST,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveDrugCategoryList(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const drugCategoryListResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveDrugCategoryListResponse(drugCategoryListResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch drugCategoryList function
 */
export function* watchDrugCategoryList() {
  yield takeLatest("DRUG_CATEGORY_LIST", drugCategoryList);
}
