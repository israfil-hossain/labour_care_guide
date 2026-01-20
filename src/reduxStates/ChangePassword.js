import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  passChange: null,
  passChangeResponse: null,
};

const savePassChangeData = (state, action) => {
  state.passChange = action.payload;
  state.passChangeResponse = null;
};

const savePassChangeResponseData = (state, action) => {
  state.passChangeResponse = action?.payload || state.passChangeResponse;
};

const removePassChangeResponseData = (state) => {
  state.passChangeResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* PasswordChange slice */
const PasswordChangeSlice = createSlice({
  name: "PasswordChange",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    savePassChange: savePassChangeData,
    savePassChangeResponse: savePassChangeResponseData,
    removePassChangeResponse: removePassChangeResponseData,
  },
});

// Get actions from created PasswordChangeSlice
const { savePassChange, savePassChangeResponse, removePassChangeResponse } =
  PasswordChangeSlice.actions;

const PasswordChangeSliceReducer = PasswordChangeSlice.reducer;

const selectPassChange = ({ changePass }) => changePass.passChange ?? null;

export {
  PasswordChangeSliceReducer,
  savePassChange,
  savePassChangeResponse,
  removePassChangeResponse,
  signOutAction,
  selectPassChange,
};
