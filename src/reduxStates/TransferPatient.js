import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  transferPatient: null,
  transferPatientResponse: null,
};

const saveTransferPatientData = (state, action) => {
  state.transferPatient = action.payload;
  state.transferPatientResponse = null;
};

const saveTransferPatientResponseData = (state, action) => {
  state.transferPatientResponse =
    action?.payload || state.transferPatientResponse;
};

const removeTransferPatientResponseData = (state) => {
  state.transferPatientResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* TransferPatient slice */
const TransferPatientSlice = createSlice({
  name: "TransferPatient",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveTransferPatient: saveTransferPatientData,
    saveTransferPatientResponse: saveTransferPatientResponseData,
    removeTransferPatientResponse: removeTransferPatientResponseData,
  },
});

// Get actions from created TransferPatientSlice
const {
  saveTransferPatient,
  saveTransferPatientResponse,
  removeTransferPatientResponse,
} = TransferPatientSlice.actions;

const TransferPatientSliceReducer = TransferPatientSlice.reducer;

const selectPatientTransfer = ({ patientTransfer }) =>
  patientTransfer.transferPatient ?? null;
const selectPatientTransferError = ({ patientTransfer }) =>
  patientTransfer.transferPatientResponse ?? null;

export {
  TransferPatientSliceReducer,
  saveTransferPatient,
  saveTransferPatientResponse,
  removeTransferPatientResponse,
  signOutAction,
  selectPatientTransfer,
  selectPatientTransferError,
};
