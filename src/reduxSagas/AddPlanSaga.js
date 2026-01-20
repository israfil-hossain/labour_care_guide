import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveAddPlan, saveAddPlanResponse } from "../reduxStates/AddPlan";

const { ApiService, apiCallTypes } = Api;

export function* addPlan(action) {
  yield put(UI.showLoader(true));

  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.ADD_PLAN,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveAddPlan(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const addPatientResponse = {
    status: false,
    message: data?.result?.message ?? "Invalid login credentials!!",
  };
  yield put(saveAddPlanResponse(addPatientResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch addPlan function
 */
export function* watchAddPlan() {
  yield takeLatest("ADD_PLAN", addPlan);
}
