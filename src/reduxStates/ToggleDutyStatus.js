import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  dutyStatus: null,
  dutyStatusResponse: null,
};

const saveDutyStatusData = (state, action) => {
  state.dutyStatus = action.payload;
  state.dutyStatusResponse = null;
};

const saveDutyStatusResponseData = (state, action) => {
  state.dutyStatusResponse = action?.payload || state.dutyStatusResponse;
};

const removeDutyStatusResponseData = (state) => {
  state.dutyStatusResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* DutyStatus slice */
const DutyStatusSlice = createSlice({
  name: "DutyStatus",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveDutyStatus: saveDutyStatusData,
    saveDutyStatusResponse: saveDutyStatusResponseData,
    removeDutyStatusResponse: removeDutyStatusResponseData,
  },
});

// Get actions from created DutyStatusSlice
const { saveDutyStatus, saveDutyStatusResponse, removeDutyStatusResponse } =
  DutyStatusSlice.actions;

const DutyStatusSliceReducer = DutyStatusSlice.reducer;

export {
  DutyStatusSliceReducer,
  saveDutyStatus,
  saveDutyStatusResponse,
  removeDutyStatusResponse,
  signOutAction,
};
