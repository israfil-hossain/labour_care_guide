import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  hideAlertStatus: null,
  hideAlertResponse: null,
};

const saveHideAlertStatusData = (state, action) => {
  state.hideAlertStatus = action.payload;
  state.hideAlertResponse = null;
};

const saveHideAlertStatusResponseData = (state, action) => {
  state.hideAlertResponse = action?.payload || state.hideAlertResponse;
};

const removeHideAlertStatusResponseData = (state) => {
  state.hideAlertResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* HideAlertStatus Slice  */
const HideAlertStatusSlice = createSlice({
  name: "HideAlert",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveHideAlertStatus: saveHideAlertStatusData,
    saveHideAlertStatusResponse: saveHideAlertStatusResponseData,
    removeHideAlertStatusResponse: removeHideAlertStatusResponseData,
  },
});

// Get actions from created HideAlertStatusSlice
const {
  saveHideAlertStatus,
  saveHideAlertStatusResponse,
  removeHideAlertStatusResponse,
} = HideAlertStatusSlice.actions;

const HideAlertStatusSliceReducer = HideAlertStatusSlice.reducer;

const selectAlertHide = ({alertHideToggle})=> alertHideToggle?.hideAlertStatus ?? null;

export {
  HideAlertStatusSliceReducer,
  saveHideAlertStatus,
  saveHideAlertStatusResponse,
  removeHideAlertStatusResponse,
  signOutAction,
  selectAlertHide
};
