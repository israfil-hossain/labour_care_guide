import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  lcgDetailList: null,
  lcgDetailListResponse: null,
};

const saveLcgDetailListData = (state, action) => {
  state.lcgDetailList = action.payload;
  state.lcgDetailListResponse = null;
};

const saveLcgDetailListResponseData = (state, action) => {
  state.lcgDetailListResponse = action?.payload || state.lcgDetailListResponse;
};

const removeLcgDetailListResponseData = (state) => {
  state.lcgDetailListResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* DetailListLCG slice */
const DetailListLCGSlice = createSlice({
  name: "DetailListLCG",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveLcgDetailList: saveLcgDetailListData,
    saveLcgDetailListResponse: saveLcgDetailListResponseData,
    removeLcgDetailListResponse: removeLcgDetailListResponseData,
  },
});

// Get actions from created DetailListLCGSlice
const {
  saveLcgDetailList,
  saveLcgDetailListResponse,
  removeLcgDetailListResponse,
} = DetailListLCGSlice.actions;

const DetailListLCGSliceReducer = DetailListLCGSlice.reducer;

const selectDetailLCG = ({ detailLcg }) => detailLcg.lcgDetailList ?? null;

export {
  DetailListLCGSliceReducer,
  saveLcgDetailList,
  saveLcgDetailListResponse,
  removeLcgDetailListResponse,
  signOutAction,
  selectDetailLCG,
};
