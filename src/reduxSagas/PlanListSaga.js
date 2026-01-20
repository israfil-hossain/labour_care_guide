import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import {
  saveListPlan,
  saveListPlanResponse,
} from "../reduxStates/PlanList";

const { ApiService, apiCallTypes } = Api;

export function* listPlan(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.GET_PLAN_LIST,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveListPlan(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const listPlanResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(saveListPlanResponse(listPlanResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch listPlan function
 */
export function* watchListPlan() {
  yield takeLatest("GET_PLAN_LIST", listPlan);
}
