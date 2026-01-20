import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  otpSend: null,
  otpSendResponse: null,
};

const saveSendOtpData = (state, action) => {
  state.otpSend = action.payload;
  state.otpSendResponse = null;
};

const saveSendOtpResponseData = (state, action) => {
  state.otpSendResponse = action?.payload || state.otpSendResponse;
};

const removeSendOtpResponseData = (state) => {
  state.otpSendResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* SendOtp slice */
const SendOtpSlice = createSlice({
  name: "SendOtp",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveSendOtp: saveSendOtpData,
    saveSendOtpResponse: saveSendOtpResponseData,
    removeSendOtpResponse: removeSendOtpResponseData,
  },
});

// Get actions from created SendOtpSlice
const { saveSendOtp, saveSendOtpResponse, removeSendOtpResponse } =
  SendOtpSlice.actions;

const SendOtpSliceReducer = SendOtpSlice.reducer;

const selectOtpResponse = ({ sendOtp }) => sendOtp.otpSendResponse ?? null;
const selectOtp = ({ sendOtp }) => sendOtp.otpSend ?? null;

export {
  SendOtpSliceReducer,
  saveSendOtp,
  saveSendOtpResponse,
  removeSendOtpResponse,
  signOutAction,
  selectOtpResponse,
  selectOtp,
};
