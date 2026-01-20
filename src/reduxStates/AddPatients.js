import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  addPateints: null,
  addPateintsResponse: null,
};

const saveAddPatientsData = (state, action) => {
  state.addPateints = action.payload;
  state.addPateintsResponse = null;
};

const saveAddPateintsResponseData = (state, action) => {
  state.addPateintsResponse = action?.payload || state.addPateintsResponse;
};

const removeAddPateintsResponseData = (state) => {
  state.addPateintsResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* AddPateint slice */
const AddPateintSlice = createSlice({
  name: "AddPateint",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveAddPatients: saveAddPatientsData,
    saveAddPateintsResponse: saveAddPateintsResponseData,
    removeAddPateintsResponse: removeAddPateintsResponseData,
  },
});

// Get actions from created AddPateintSlice
const { saveAddPatients, saveAddPateintsResponse, removeAddPateintsResponse } =
  AddPateintSlice.actions;

const AddPateintSliceReducer = AddPateintSlice.reducer;

const selectAddPatient = ({ pateintAdd }) => pateintAdd.addPateints ?? null;

export {
  AddPateintSliceReducer,
  saveAddPatients,
  saveAddPateintsResponse,
  removeAddPateintsResponse,
  signOutAction,
  selectAddPatient,
};
