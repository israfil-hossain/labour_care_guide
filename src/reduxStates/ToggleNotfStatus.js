import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  notfStatus: null,
  notfStatusResponse: null,
};

const saveNotfStatusData = (state, action) => {
  state.notfStatus = action.payload;
  state.notfStatusResponse = null;
};

const saveNotfStatusResponseData = (state, action) => {
  state.notfStatusResponse = action?.payload || state.notfStatusResponse;
};

const removeNotfStatusResponseData = (state) => {
  state.notfStatusResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* NotfStatus slice */
const NotfStatusSlice = createSlice({
  name: "NotfStatus",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveNotfStatus: saveNotfStatusData,
    saveNotfStatusResponse: saveNotfStatusResponseData,
    removeNotfStatusResponse: removeNotfStatusResponseData,
  },
});

// Get actions from created NotfStatusSlice
const { saveNotfStatus, saveNotfStatusResponse, removeNotfStatusResponse } =
  NotfStatusSlice.actions;

const NotfStatusSliceeReducer = NotfStatusSlice.reducer;

export {
  NotfStatusSliceeReducer,
  saveNotfStatus,
  saveNotfStatusResponse,
  removeNotfStatusResponse,
  signOutAction,
};
