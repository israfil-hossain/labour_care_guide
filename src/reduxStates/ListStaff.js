import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  staffList: null,
  staffDataList: [],
  staffpageNum: 1,
  staffListResponse: null,
};

const saveStaffListData = (state, action) => {
  state.staffList = action.payload;
  state.staffListResponse = null;
};

const saveStaffListPagnaitedData = (state, action) => {
  if (state.staffpageNum == 1) {
    state.staffDataList = action.payload;
  } else {
    state.staffDataList = [...state.staffDataList, ...action.payload];
  }
};

const saveStaffPageNumData = (state, action) => {
  state.staffpageNum = action?.payload || state.staffpageNum;
};

const saveStaffListResponseData = (state, action) => {
  state.staffListResponse = action?.payload || state.staffListResponse;
};

const removeStaffListResponseData = (state) => {
  state.staffListResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* StaffList slice */
const StaffListSlice = createSlice({
  name: "StaffList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveStaffList: saveStaffListData,
    saveStaffListResponse: saveStaffListResponseData,
    saveStaffListPagnaited: saveStaffListPagnaitedData,
    saveStaffPageNum: saveStaffPageNumData,
    removeStaffListResponse: removeStaffListResponseData,
  },
});

// Get actions from created StaffListSlice
const { saveStaffList,saveStaffListPagnaited, saveStaffPageNum, saveStaffListResponse, removeStaffListResponse } =
  StaffListSlice.actions;

const StaffListSliceReducer = StaffListSlice.reducer;

const selectStaffData = ({ listStaff }) => listStaff.staffList ?? null;

const selectStaffPaginated = ({listStaff})=> listStaff.staffDataList ?? []

export {
  StaffListSliceReducer,
  saveStaffList,
  saveStaffListResponse,
  removeStaffListResponse,
  signOutAction,
  selectStaffData,
  saveStaffListPagnaited,
  selectStaffPaginated,
  saveStaffPageNum
};
