import { takeLatest, call, put } from "redux-saga/effects";
import { Api } from "../services";
import { UI } from "../reduxStates";
import { saveAddPatients, saveAddPateintsResponse} from "../reduxStates/AddPatients";

const { ApiService, apiCallTypes } = Api;

export function* addPatient(action) {
    yield put(UI.showLoader(true));
    const data = yield call(
      ApiService.callApiService,
      apiCallTypes.ADD_PATIENT,
      action.payload
    );
    if (data.isSucceded) {
      yield put(saveAddPatients(data?.result?.data));
      yield put(UI.showLoader(false));
      return;
    }
  
    const addPatientResponse = {
      status: false,
      message: data?.result?.message ?? "Invalid login credentials!!",
    };
    yield put(saveAddPateintsResponse(addPatientResponse));
    yield put(UI.showLoader(false));
  }
  
  /**
   * Watch addPatient function
   */
  export function* watchAddPatient() {
    yield takeLatest("ADD_PATIENT", addPatient);
  }