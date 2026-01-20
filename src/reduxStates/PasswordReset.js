import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  passReset: null,
  passResetResponse: null,
};

const saveResetPassData = (state, action) => {
  state.passReset = action.payload;
  state.passResetResponse = null;
};

const saveResetPassResponseData = (state, action) => {
  state.passResetResponse = action?.payload || state.passResetResponse;
};

const removeResetPassResponseData = (state) => {
  state.passResetResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* ResetPassword slice */
const ResetPasswordSlice = createSlice({
  name: "ResetPassword",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveResetPass: saveResetPassData,
    saveResetPassResponse: saveResetPassResponseData,
    removeResetPassResponse: removeResetPassResponseData,
  },
});

// Get actions from created ResetPasswordSlice
const { saveResetPass, saveResetPassResponse, removeResetPassResponse } =
  ResetPasswordSlice.actions;

const ResetPasswordSliceReducer = ResetPasswordSlice.reducer;

const selectResetPass = ({ resetPassword }) => resetPassword.passReset ?? null;
const selectResetPassResponse = ({ resetPassword }) =>
  resetPassword.passResetResponse ?? null;

export {
  ResetPasswordSliceReducer,
  saveResetPass,
  saveResetPassResponse,
  removeResetPassResponse,
  signOutAction,
  selectResetPass,
  selectResetPassResponse,
};
