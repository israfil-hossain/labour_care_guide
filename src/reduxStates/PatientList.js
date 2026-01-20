import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  patientList: null,
  paginatedpatientList: [],
  patientPageNum: 1,
  patientListResponse: null,
  filterOption: "",
};

const savePatientListData = (state, action) => {
  state.patientList = action.payload;
  state.patientListResponse = null;
};

const savePatientFilterOptionData = (state, action) => {
  state.filterOption = action.payload;
};

const savePatientListPagnaitedData = (state, action) => {
  const pageNumRes = action.payload.pagination?.currentPage;

  if (pageNumRes == 1) {
    state.paginatedpatientList = action.payload.patients;
  } else if (action.payload.patients && action?.payload?.patients?.length > 0) {
    state.paginatedpatientList = [
      ...state.paginatedpatientList,
      ...action.payload.patients,
    ];
  }
};

const savePatientListResponseData = (state, action) => {
  state.patientListResponse = action?.payload || state.patientListResponse;
};

const removePatientListResponseData = (state) => {
  state.patientListResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* PatientList slice */
const PatientListSlice = createSlice({
  name: "PatientList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    savePatientList: savePatientListData,
    savePatientListPagnaited: savePatientListPagnaitedData,
    savePatientListResponse: savePatientListResponseData,
    savePatientFilterOption: savePatientFilterOptionData,
    removePatientListResponse: removePatientListResponseData,
  },
});

// Get actions from created PatientList
const {
  savePatientList,
  savePatientListPagnaited,
  savePatientListResponse,
  removePatientListResponse,
  savePatientFilterOption,
} = PatientListSlice.actions;

const PatientListSliceReducer = PatientListSlice.reducer;

const selectPatientList = ({ listPateints }) =>
  listPateints?.patientList ?? null;

const selectPaginatedListPatient = ({ listPateints }) =>
  listPateints?.paginatedpatientList ?? [];

const selectOptionFilter = ({ listPateints }) =>
  listPateints?.filterOption ?? "";

export {
  PatientListSliceReducer,
  savePatientList,
  savePatientListPagnaited,
  savePatientListResponse,
  removePatientListResponse,
  signOutAction,
  selectPatientList,
  selectPaginatedListPatient,
  savePatientFilterOption,
  selectOptionFilter
};
