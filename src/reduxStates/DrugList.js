import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  drugList: null,
  drugListResponse: null,
};

const saveDrugListData = (state, action) => {
  state.drugList = action.payload;
  state.drugListResponse = null;
};

const saveDrugListResponseData = (state, action) => {
  state.drugListResponse = action?.payload || state.drugListResponse;
};

const removeDrugListResponseData = (state) => {
  state.drugListResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* DrugList slice */
const DrugListSlice = createSlice({
  name: "DrugList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveDrugList: saveDrugListData,
    saveDrugListResponse: saveDrugListResponseData,
    removeDrugListResponse: removeDrugListResponseData,
  },
});

// Get actions from created DrugListSlice
const { saveDrugList, saveDrugListResponse, removeDrugListResponse } =
  DrugListSlice.actions;

const DrugListSliceReducer = DrugListSlice.reducer;

const selectDrugList = ({listDrug})=> listDrug.drugList ?? null

export {
  DrugListSliceReducer,
  saveDrugList,
  saveDrugListResponse,
  removeDrugListResponse,
  signOutAction,
  selectDrugList
};
