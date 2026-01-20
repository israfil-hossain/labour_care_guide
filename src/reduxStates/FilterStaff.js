import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  filterStaffData: null,
  filterStaffDataResponse: null,
};

const saveFilterStaffData = (state, action) => {
  state.filterStaffData = action.payload;
  state.filterStaffDataResponse = null;
};

const saveFilterStaffResponseData = (state, action) => {
  state.filterStaffDataResponse =
    action?.payload || state.filterStaffDataResponse;
};

const removeFilterStaffResponseData = (state) => {
  state.filterStaffDataResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* StaffFilter slice */
const StaffFilterSlice = createSlice({
  name: "StaffFilter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveFilterStaff: saveFilterStaffData,
    saveFilterStaffResponse: saveFilterStaffResponseData,
    removeFilterStaffResponse: removeFilterStaffResponseData,
  },
});

// Get actions from created StaffFilterSlice
const { saveFilterStaff, saveFilterStaffResponse, removeFilterStaffResponse } =
  StaffFilterSlice.actions;

const StaffFilterSliceReducer = StaffFilterSlice.reducer;

const selectfilterStaff = ({ filterStaff }) =>
  filterStaff.filterStaffData ?? null;

export {
  StaffFilterSliceReducer,
  saveFilterStaff,
  saveFilterStaffResponse,
  removeFilterStaffResponse,
  signOutAction,
  selectfilterStaff
};
