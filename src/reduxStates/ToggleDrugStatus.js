import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  drugStatus: null,
  drugStatusResponse: null,
};

const saveDrugStatusData = (state, action) => {
  state.drugStatus = action.payload;
  state.drugStatusResponse = null;
};

const saveDrugStatusResponseData = (state, action) => {
  state.drugStatusResponse = action?.payload || state.drugStatusResponse;
};

const removeDrugStatusResponseData = (state) => {
  state.drugStatusResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* DrugStatus slice */
const DrugStatusSlice = createSlice({
  name: "DrugStatus",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveDrugStatus: saveDrugStatusData,
    saveDrugStatusResponse: saveDrugStatusResponseData,
    removeDrugStatusResponse: removeDrugStatusResponseData,
  },
});

// Get actions from created DrugStatusSlice
const { saveDrugStatus, saveDrugStatusResponse, removeDrugStatusResponse } =
  DrugStatusSlice.actions;

const DrugStatusSliceReducer = DrugStatusSlice.reducer;

const selectDrugStatus = ({ statusDrug }) => statusDrug.drugStatus ?? null;

export {
  DrugStatusSliceReducer,
  saveDrugStatus,
  saveDrugStatusResponse,
  removeDrugStatusResponse,
  signOutAction,
  selectDrugStatus
};
