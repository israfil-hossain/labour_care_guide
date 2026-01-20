import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  dischargePatient: null,
  dischargePatientResponse: null,
};

const saveDischargePatientData = (state, action) => {
  state.dischargePatient = action.payload;
  state.dischargePatientResponse = null;
};

const saveDischargePatientResponseData = (state, action) => {
  state.dischargePatientResponse =
    action?.payload || state.dischargePatientResponse;
};

const removeDischargePatientResponseData = (state) => {
  state.dischargePatientResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* DischargePatient slice */
const DischargePatientSlice = createSlice({
  name: "DischargePatient",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveDischargePatient: saveDischargePatientData,
    saveDischargePatientResponse: saveDischargePatientResponseData,
    removeDischargePatientResponse: removeDischargePatientResponseData,
  },
});

// Get actions from created DischargePatientSlice
const {
  saveDischargePatient,
  saveDischargePatientResponse,
  removeDischargePatientResponse,
} = DischargePatientSlice.actions;

const DischargePatientSliceReducer = DischargePatientSlice.reducer;

const selectDischargePatient = ({ dischargePatient }) =>
  dischargePatient.dischargePatient ?? null;
const selectDischargeErrorResponse = ({ dischargePatient }) =>
  dischargePatient.dischargePatientResponse ?? null;

export {
  DischargePatientSliceReducer,
  saveDischargePatient,
  saveDischargePatientResponse,
  removeDischargePatientResponse,
  signOutAction,
  selectDischargePatient,
  selectDischargeErrorResponse,
};
