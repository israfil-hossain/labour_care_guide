import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  wardsearchList: null,
  wardsearchListResponse: null,
};

const saveWardsearchListData = (state, action) => {
  state.wardsearchList = action.payload;
  state.wardsearchListResponse = null;
};

const saveWardSearchListResponseData = (state, action) => {
  state.wardsearchListResponse =
    action?.payload || state.wardsearchListResponse;
};

const removeWardSearchListResponseData = (state) => {
  state.wardsearchListResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* WardSearch slice */
const WardSearchSlice = createSlice({
  name: "WardSearch",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveWardsearchList: saveWardsearchListData,
    saveWardSearchListResponse: saveWardSearchListResponseData,
    removeWardSearchListResponse: removeWardSearchListResponseData,
  },
});

// Get actions from created WardSearchSlice
const {
  saveWardsearchList,
  saveWardSearchListResponse,
  removeWardSearchListResponse,
} = WardSearchSlice.actions;

const WardSearchSliceReducer = WardSearchSlice.reducer;

const selectWardListData = ({ searchWard }) =>
  searchWard.wardsearchList ?? null;

export {
  WardSearchSliceReducer,
  saveWardsearchList,
  saveWardSearchListResponse,
  removeWardSearchListResponse,
  signOutAction,
  selectWardListData
};
