import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  sortpatientList: null,
  sortpatientListResponse: null,
};

const saveSortPatientListData = (state, action) => {
  state.sortpatientList = action.payload;
  state.sortpatientListResponse = null;
};

const saveSortPatientListResponseData = (state, action) => {
  state.sortpatientListResponse =
    action?.payload || state.sortpatientListResponse;
};

const removeSortPatientListResponseData = (state) => {
  state.sortpatientListResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* SortPatientList slice */
const SortPatientListSlice = createSlice({
  name: "SortPatientList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveSortPatientList: saveSortPatientListData,
    saveSortPatientListResponse: saveSortPatientListResponseData,
    removeSortPatientListResponse: removeSortPatientListResponseData,
  },
});

// Get actions from created SortPatientList
const {
  saveSortPatientList,
  saveSortPatientListResponse,
  removeSortPatientListResponse,
} = SortPatientListSlice.actions;

const SortPatientListSliceReducer = SortPatientListSlice.reducer;

const selectSortPatient = ({ sortPatientList }) =>
  sortPatientList.sortpatientList ?? null;

export {
  SortPatientListSliceReducer,
  saveSortPatientList,
  saveSortPatientListResponse,
  removeSortPatientListResponse,
  signOutAction,
  selectSortPatient,
};
