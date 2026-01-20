import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  listNotf: null,
  listNotfResponse: null,
};

const saveListNotfData = (state, action) => {
  state.listNotf = action.payload;
  state.listNotfResponse = null;
};

const saveListNotfResponseData = (state, action) => {
  state.listNotfResponse = action?.payload || state.listNotfResponse;
};

const removeListNotfResponseData = (state) => {
  state.listNotfResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* NotfList slice */
const NotfListSlice = createSlice({
  name: "NotfList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveListNotf: saveListNotfData,
    saveListNotfResponse: saveListNotfResponseData,
    removeListNotfResponse: removeListNotfResponseData,
  },
});

// Get actions from created NotfListSlice
const { saveListNotf, saveListNotfResponse, removeListNotfResponse } =
  NotfListSlice.actions;

const NotfListSliceReducer = NotfListSlice.reducer;

const selectNotfList = ({ listNotifications }) =>
  listNotifications.listNotf ?? null;

export {
  NotfListSliceReducer,
  saveListNotf,
  saveListNotfResponse,
  removeListNotfResponse,
  signOutAction,
  selectNotfList,
};
