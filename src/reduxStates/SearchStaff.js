import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  staffsearchList: null,
  staffsearchListResponse: null,
};

const saveStaffsearchListData = (state, action) => {
  state.staffsearchList = action.payload;
  state.staffsearchListResponse = null;
};

const saveStaffSearchListResponseData = (state, action) => {
  state.staffsearchListResponse =
    action?.payload || state.staffsearchListResponse;
};

const removeStaffSearchListResponseData = (state) => {
  state.staffsearchListResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* StaffSearch slice */
const StaffSearchSlice = createSlice({
  name: "StaffSearch",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveStaffsearchList: saveStaffsearchListData,
    saveStaffSearchListResponse: saveStaffSearchListResponseData,
    removeStaffSearchListResponse: removeStaffSearchListResponseData,
  },
});

// Get actions from created StaffSearchSlice
const {
  saveStaffsearchList,
  saveStaffSearchListResponse,
  removeStaffSearchListResponse,
} = StaffSearchSlice.actions;

const StaffSearchSliceReducer = StaffSearchSlice.reducer;

const selectStaffSearch = ({ staffSearch }) =>
  staffSearch?.staffsearchList ?? null;

export {
  StaffSearchSliceReducer,
  saveStaffsearchList,
  saveStaffSearchListResponse,
  removeStaffSearchListResponse,
  signOutAction,
  selectStaffSearch
};
