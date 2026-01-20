import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  searchList: null,
  searchListResponse: null,
};

const saveSearchListData = (state, action) => {
  state.searchList = action.payload;
  state.searchListResponse = null;
};

const saveSearchListResponseData = (state, action) => {
  state.searchListResponse = action?.payload || state.searchListResponse;
};

const removeSearchListResponseData = (state) => {
  state.searchListResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* PatientSearch slice */
const PatientSearchSlice = createSlice({
  name: "PatientSearch",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveSearchList: saveSearchListData,
    saveSearchListResponse: saveSearchListResponseData,
    removeSearchListResponse: removeSearchListResponseData,
  },
});

// Get actions from created PatientSearchSlice
const { saveSearchList, saveSearchListResponse, removeSearchListResponse } =
  PatientSearchSlice.actions;

const PatientSearchSliceReducer = PatientSearchSlice.reducer;

const selectSearchPatient = ({ searchPatient }) =>
  searchPatient.searchList ?? null;

export {
  PatientSearchSliceReducer,
  saveSearchList,
  saveSearchListResponse,
  removeSearchListResponse,
  signOutAction,
  selectSearchPatient,
};
