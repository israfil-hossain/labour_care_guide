import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  babyList: null,
  babyListResponse: null,
};

const saveBabyListData = (state, action) => {
  state.babyList = action.payload;
  state.babyListResponse = null;
};

const saveBabyListResponseData = (state, action) => {
  state.babyListResponse = action?.payload || state.babyListResponse;
};

const removeBabyListResponseData = (state) => {
  state.babyListResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* BabyList slice */
const BabyListSlice = createSlice({
  name: "BabyList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveBabyList: saveBabyListData,
    saveBabyListResponse: saveBabyListResponseData,
    removeBabyListResponse: removeBabyListResponseData,
  },
});

// Get actions from created BabyListSlice
const { saveBabyList, saveBabyListResponse, removeBabyListResponse } =
  BabyListSlice.actions;

const BabyListSliceReducer = BabyListSlice.reducer;

const selectBabyList = ({ listBaby }) => listBaby.babyList ?? null;

export {
  BabyListSliceReducer,
  saveBabyList,
  saveBabyListResponse,
  removeBabyListResponse,
  signOutAction,
  selectBabyList
};
