import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  detailRound: null,
  roundPatientList: [],
  pageNum: 1,
  detailRoundResponse: null,
};

const saveDetailRoundData = (state, action) => {
  state.detailRound = action.payload;
  state.detailRoundResponse = null;
};

const saveRoundPatientListPagnaitedData = (state, action) => {
  state.pageNum = action?.payload?.pageNo || state.pageNum;
   const pageNumRes = action.payload.pagination?.currentPage;
  if (pageNumRes == 1) {
    state.roundPatientList = action.payload.patients;
  } else if (
    action.payload.patients &&
    action?.payload?.patients?.length > 0 
  ) { 
    state.roundPatientList = [
      ...state.roundPatientList,
      ...action.payload.patients,
    ];
  }
  
};



const saveDetailRoundResponseData = (state, action) => {
  state.detailRoundResponse = action?.payload || state.detailRoundResponse;
};

const removeDetailRoundResponseData = (state) => {
  state.detailRoundResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* RoundDetail slice */
const RoundDetailSlice = createSlice({
  name: "RoundDetail",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveDetailRound: saveDetailRoundData,
    saveDetailRoundResponse: saveDetailRoundResponseData,
    saveRoundPatientListPagnaited: saveRoundPatientListPagnaitedData,
    removeDetailRoundResponse: removeDetailRoundResponseData,
  },
});

// Get actions from created RoundDetailSlice
const {
  saveDetailRound,
  saveRoundPatientListPagnaited,
  saveDetailRoundResponse,
  removeDetailRoundResponse,

} = RoundDetailSlice.actions;

const RoundDetailSliceReducer = RoundDetailSlice.reducer;

const selectRoundDetail = ({ patienRoundDetail }) =>
  patienRoundDetail.detailRound ?? null;

const selectRoundPaginatedData = ({ patienRoundDetail }) =>
  patienRoundDetail?.roundPatientList ?? [];



export {
  RoundDetailSliceReducer,
  saveDetailRound,
  saveRoundPatientListPagnaited,
  saveDetailRoundResponse,
  removeDetailRoundResponse,
  signOutAction,
  selectRoundDetail,
  selectRoundPaginatedData,
 
};
