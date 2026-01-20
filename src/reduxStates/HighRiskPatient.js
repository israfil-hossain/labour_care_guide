import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  highRiskpatient: null,
  highRiskpatientResponse: null,
};

const saveHighRiskpatientData = (state, action) => {
  state.highRiskpatient = action.payload;
  state.highRiskpatientResponse = null;
};

const saveHighRiskpatientResponseData = (state, action) => {
  state.highRiskpatientResponse =
    action?.payload || state.highRiskpatientResponse;
};

const removeHighRiskpatientResponseData = (state) => {
  state.highRiskpatientResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* HighRiskPatient slice */
const HighRiskPatientSlice = createSlice({
  name: "HighRiskPatient",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveHighRiskpatient: saveHighRiskpatientData,
    saveHighRiskpatientResponse: saveHighRiskpatientResponseData,
    removeHighRiskpatientResponse: removeHighRiskpatientResponseData,
  },
});

// Get actions from created PatientList
const {
  saveHighRiskpatient,
  saveHighRiskpatientResponse,
  removeHighRiskpatientResponse,
} = HighRiskPatientSlice.actions;

const HighRiskPatientSliceReducer = HighRiskPatientSlice.reducer;

const selectHighRisk = ({ riskPatient }) => riskPatient.highRiskpatient ?? null;

export {
  HighRiskPatientSliceReducer,
  saveHighRiskpatient,
  saveHighRiskpatientResponse,
  removeHighRiskpatientResponse,
  signOutAction,
  selectHighRisk
};
