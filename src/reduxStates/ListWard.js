import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  wardList: null,
  wardListResponse: null,
  selectedWardId: null,
  paginatedWardList: [],
};

const saveWardListData = (state, action) => {
  state.wardList = action.payload;
  state.wardListResponse = null;
};

const saveWardListPagnaitedData = (state, action) => {
  const pageNumRes = action.payload.pagination?.currentPage;

  if (pageNumRes == 1) {
    state.paginatedWardList = action.payload.wards;
  } else if (action.payload.wards && action?.payload?.wards?.length > 0) {
    state.paginatedWardList = [
      ...state.paginatedWardList,
      ...action.payload.wards,
    ];
  }
};

const saveWardIdSelectedData = (state, action) => {
  state.selectedWardId = action.payload;
};

const saveWardListResponseData = (state, action) => {
  state.wardListResponse = action?.payload || state.wardListResponse;
};

const removeWardListResponseData = (state) => {
  state.wardListResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* WardList slice */
const WardListSlice = createSlice({
  name: "WardList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveWardList: saveWardListData,
    saveWardListResponse: saveWardListResponseData,
    saveWardIdSelected: saveWardIdSelectedData,
    saveWardListPagnaited: saveWardListPagnaitedData,
    removeWardListResponse: removeWardListResponseData,
  },
});

// Get actions from created WardListSlice
const {
  saveWardList,
  saveWardIdSelected,
  saveWardListResponse,
  saveWardListPagnaited,
  removeWardListResponse,
} = WardListSlice.actions;

const WardListSliceReducer = WardListSlice.reducer;

const selectWardsList = ({ listWards }) => listWards.wardList ?? null;

const selectWardListPaginated = ({ listWards }) =>
  listWards?.paginatedWardList ?? [];

const selectIdWard = ({ listWards }) => listWards.selectedWardId ?? null;

export {
  WardListSliceReducer,
  saveWardList,
  saveWardListResponse,
  removeWardListResponse,
  signOutAction,
  selectWardsList,
  saveWardIdSelected,
  selectIdWard,
  saveWardListPagnaited,
  selectWardListPaginated,
};
