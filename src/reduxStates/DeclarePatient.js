import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  declarePatient: null,
  declarePatientResponse: null,
};

const saveDeclarePatientData = (state, action) => {
  state.declarePatient = action.payload;
  state.declarePatientResponse = null;
};

const saveDeclarePatientResponseData = (state, action) => {
  state.declarePatientResponse =
    action?.payload || state.declarePatientResponse;
};

const removeDeclarePatientResponseData = (state) => {
  state.declarePatientResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* DeclarePatient slice */
const DeclarePatientSlice = createSlice({
  name: "DeclarePatient",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveDeclarePatient: saveDeclarePatientData,
    saveDeclarePatientResponse: saveDeclarePatientResponseData,
    removeDeclarePatientResponse: removeDeclarePatientResponseData,
  },
});

// Get actions from created DeclarePatientSlice
const {
  saveDeclarePatient,
  saveDeclarePatientResponse,
  removeDeclarePatientResponse,
} = DeclarePatientSlice.actions;

const DeclarePatientSliceReducer = DeclarePatientSlice.reducer;

const selectDeclarePatient = ({ declarePatient }) =>
  declarePatient.declarePatient ?? null;

const selectDeclareErrorResponse = ({ declarePatient }) =>
  declarePatient.declarePatientResponse ?? null;

export {
  DeclarePatientSliceReducer,
  saveDeclarePatient,
  saveDeclarePatientResponse,
  removeDeclarePatientResponse,
  signOutAction,
  selectDeclarePatient,
  selectDeclareErrorResponse
};
