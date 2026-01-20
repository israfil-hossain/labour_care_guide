import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { savePatientDetail, savePatientDetailResponse } from "../reduxStates/DetailsPatient";

const { ApiService, apiCallTypes } = Api;

export function* detailPatient(action) {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.PATEINT_DETAIL,
    action.payload
  );
  if (data.isSucceded) {
    yield put(savePatientDetail(data?.result?.data));
    yield put(UI.showLoader(false));
    return;
  }

  const detailPatientResponse = {
    status: false,
    message: data?.result?.message ?? "Something went wrong. please try again!",
  };
  yield put(savePatientDetailResponse(detailPatientResponse));
  yield put(UI.showLoader(false));
}

/**
 * Watch detailPatient function
 */
export function* watchDetailPatient() {
  yield takeLatest("PATEINT_DETAIL", detailPatient);
}
