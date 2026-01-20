import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  addPlan: null,
  addPlanResponse: null,
};

const saveAddPlanData = (state, action) => {
  state.addPlan = action.payload;
  state.addPlanResponse = null;
};

const saveAddPlanResponseData = (state, action) => {
  state.addPlanResponse = action?.payload || state.addPlanResponse;
};

const removeAddPlanResponseData = (state) => {
  state.addPlanResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* AddPlan slice */
const AddPlanSlice = createSlice({
  name: "AddPlan",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveAddPlan: saveAddPlanData,
    saveAddPlanResponse: saveAddPlanResponseData,
    removeAddPlanResponse: removeAddPlanResponseData,
  },
});

// Get actions from created AddPlanSlice
const { saveAddPlan, saveAddPlanResponse, removeAddPlanResponse } =
  AddPlanSlice.actions;

const AddPlanSliceReducer = AddPlanSlice.reducer;

const selectAddPlan = ({ planAdd }) => planAdd.addPlan ?? null;

export {
  AddPlanSliceReducer,
  saveAddPlan,
  saveAddPlanResponse,
  removeAddPlanResponse,
  signOutAction,
  selectAddPlan,
};
