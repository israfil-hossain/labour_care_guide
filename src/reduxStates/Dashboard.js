import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  dashBoardData: null,
  dashBoardDataResponse: null,
};

const saveDashBoardData = (state, action) => {
  state.dashBoardData = action.payload;
  state.dashBoardDataResponse = null;
};

const saveDashBoardResponseData = (state, action) => {
  state.dashBoardDataResponse = action?.payload || state.dashBoardDataResponse;
};

const removeDashBoardResponseData = (state) => {
  state.dashBoardDataResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* DashBoard slice */
const DashBoardSlice = createSlice({
  name: "DashBoard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveDashBoard: saveDashBoardData,
    saveDashBoardResponse: saveDashBoardResponseData,
    removeDashBoardResponse: removeDashBoardResponseData,
  },
});

// Get actions from created DashBoardSlice
const { saveDashBoard, saveDashBoardResponse, removeDashBoardResponse } =
  DashBoardSlice.actions;

const DashBoardSliceReducer = DashBoardSlice.reducer;

const selectDashBoardData = ({ dashBoard }) => dashBoard.dashBoardData ?? null;

export {
  DashBoardSliceReducer,
  saveDashBoard,
  saveDashBoardResponse,
  removeDashBoardResponse,
  signOutAction,
  selectDashBoardData
};
