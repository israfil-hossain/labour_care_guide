import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  lcgReport: null,
  lcgReportResponse: null,
};

const saveLcgReportData = (state, action) => {
  state.lcgReport = action.payload;
  state.lcgReportResponse = null;
};

const saveLcgReportResponseData = (state, action) => {
  state.lcgReportResponse = action?.payload || state.lcgReportResponse;
};

const removeLcgReportResponseData = (state) => {
  state.lcgReportResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* ReportLcg slice */
const ReportLcgSlice = createSlice({
  name: "ReportLcg",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveLcgReport: saveLcgReportData,
    saveLcgReportResponse: saveLcgReportResponseData,
    removeLcgReportResponse: removeLcgReportResponseData,
  },
});

// Get actions from created ReportLcgSlice
const { saveLcgReport, saveLcgReportResponse, removeLcgReportResponse } =
  ReportLcgSlice.actions;

const ReportLcgSliceReducer = ReportLcgSlice.reducer;

const selectLcgReport = ({reportLcg})=> reportLcg.lcgReport ?? null;

export {
  ReportLcgSliceReducer,
  saveLcgReport,
  saveLcgReportResponse,
  removeLcgReportResponse,
  signOutAction,
  selectLcgReport
};
