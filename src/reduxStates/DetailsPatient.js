import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  patientdata: null,
  patientdataResponse: null,
};

const savePatientDetailData = (state, action) => {
  state.patientdata = action.payload;
  state.patientdataResponse = null;
};

const savePatientDetailResponseData = (state, action) => {
  state.patientdataResponse = action?.payload || state.patientdataResponse;
};

const removePatientDetailResponseData = (state) => {
  state.patientdataResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* DetailPatient slice */
const DetailPatientSlice = createSlice({
  name: "DetailPatient",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    savePatientDetail: savePatientDetailData,
    savePatientDetailResponse: savePatientDetailResponseData,
    removePatientDetailResponse: removePatientDetailResponseData,
  },
});

// Get actions from created DetailPatientSlice
const {
  savePatientDetail,
  savePatientDetailResponse,
  removePatientDetailResponse,
} = DetailPatientSlice.actions;

const DetailPatientSliceReducer = DetailPatientSlice.reducer;

const selectDetailPatient = ({ dataPatient }) =>
  dataPatient.patientdata ?? null;

export {
  DetailPatientSliceReducer,
  savePatientDetail,
  savePatientDetailResponse,
  removePatientDetailResponse,
  signOutAction,
  selectDetailPatient
};
