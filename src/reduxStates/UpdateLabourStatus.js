import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  labourStatus: null,
  labourStatusResponse: null,
};

const saveLabourStatusData = (state, action) => {
  state.labourStatus = action.payload;
  state.labourStatusResponse = null;
};

const saveLabourStatusResponseData = (state, action) => {
  state.labourStatusResponse = action?.payload || state.labourStatusResponse;
};

const removeLabourStatusResponseData = (state) => {
  state.labourStatusResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* LabourStatus slice */
const LabourStatusSlice = createSlice({
  name: "LabourStatus",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveLabourStatus: saveLabourStatusData,
    saveLabourStatusResponse: saveLabourStatusResponseData,
    removeLabourStatusResponse: removeLabourStatusResponseData,
  },
});

// Get actions from created LabourStatusSlice
const {
  saveLabourStatus,
  saveLabourStatusResponse,
  removeLabourStatusResponse,
} = LabourStatusSlice.actions;

const LabourStatusSliceReducer = LabourStatusSlice.reducer;

const selectLabourStatus = ({ updateLabourStatus }) =>
  updateLabourStatus.labourStatus ?? null;

export {
  LabourStatusSliceReducer,
  saveLabourStatus,
  saveLabourStatusResponse,
  removeLabourStatusResponse,
  signOutAction,
  selectLabourStatus,
};
