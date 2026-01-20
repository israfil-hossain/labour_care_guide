import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  passForgot: null,
  passForgotResponse: null,
};

const savePassForgotData = (state, action) => {
  state.passForgot = action.payload;
  state.passForgotResponse = null;
};

const savePassForgotResponseData = (state, action) => {
  state.passForgotResponse = action?.payload || state.passForgotResponse;
};

const removePassForgotResponseData = (state) => {
  state.passForgotResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* PasswordForget slice */
const PasswordForgetSlice = createSlice({
  name: "PasswordForget",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    savePassForgot: savePassForgotData,
    savePassForgotResponse: savePassForgotResponseData,
    removePassForgotResponse: removePassForgotResponseData,
  },
});

// Get actions from created PasswordForgetSlice
const { savePassForgot, savePassForgotResponse, removePassForgotResponse } =
  PasswordForgetSlice.actions;

const PasswordForgetSliceReducer = PasswordForgetSlice.reducer;

const selectForgetPass = ({ passwordForget }) =>
  passwordForget.passForgot ?? null;

const selectForgetPassResponse = ({ passwordForget }) =>
  passwordForget.passForgotResponse ?? null;

export {
  PasswordForgetSliceReducer,
  savePassForgot,
  savePassForgotResponse,
  removePassForgotResponse,
  signOutAction,
  selectForgetPass,
  selectForgetPassResponse,
};
