import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  listPlan: null,
  listPlanResponse: null,
};

const saveListPlanData = (state, action) => {
  state.listPlan = action.payload;
  state.listPlanResponse = null;
};

const saveListPlanResponseData = (state, action) => {
  state.listPlanResponse = action?.payload || state.listPlanResponse;
};

const removeListPlanResponseData = (state) => {
  state.listPlanResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* PlanList slice */
const PlanListSlice = createSlice({
  name: "PlanList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveListPlan: saveListPlanData,
    saveListPlanResponse: saveListPlanResponseData,
    removeListPlanResponse: removeListPlanResponseData,
  },
});

// Get actions from created PlanListSlice
const { saveListPlan, saveListPlanResponse, removeListPlanResponse } =
  PlanListSlice.actions;

const PlanListSliceReducer = PlanListSlice.reducer;

const selectPlanList = ({ planList }) => planList.listPlan ?? null;

export {
  PlanListSliceReducer,
  saveListPlan,
  saveListPlanResponse,
  removeListPlanResponse,
  signOutAction,
  selectPlanList
};
