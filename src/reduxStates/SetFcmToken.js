import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  setFcmData: null,
  setFcmDataResponse: null,
};

const saveSetFCMData = (state, action) => {
  state.setFcmData = action.payload;
  state.setFcmDataResponse = null;
};

const saveSetFCMResponseData = (state, action) => {
  state.setFcmDataResponse = action?.payload || state.setFcmDataResponse;
};

const removeSetFCMResponseData = (state) => {
  state.setFcmDataResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* SetTokenFcm slice */
const SetTokenFcmSlice = createSlice({
  name: "SetTokenFcm",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveSetFCM: saveSetFCMData,
    saveSetFCMResponse: saveSetFCMResponseData,
    removeSetFCMResponse: removeSetFCMResponseData,
  },
});

// Get actions from created SetTokenFcmSlice
const { saveSetFCM, saveSetFCMResponse, removeSetFCMResponse } =
  SetTokenFcmSlice.actions;

const SetTokenFcmSliceReducer = SetTokenFcmSlice.reducer;

const selectFcmResponse = ({ fcmTokenSet }) => fcmTokenSet.setFcmData ?? null;

export {
  SetTokenFcmSliceReducer,
  saveSetFCM,
  saveSetFCMResponse,
  removeSetFCMResponse,
  signOutAction,
  selectFcmResponse
};
