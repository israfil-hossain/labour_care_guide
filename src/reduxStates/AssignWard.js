import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  wardAssign: null,
  wardAssignResponse: null,
};

const saveWardAssignData = (state, action) => {
  state.wardAssign = action.payload;
  state.wardAssignResponse = null;
};

const saveWardAssignResponseData = (state, action) => {
  state.wardAssignResponse = action?.payload || state.wardAssignResponse;
};

const removeWardAssignResponseData = (state) => {
  state.wardAssignResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* AssignWard slice */
const AssignWardSlice = createSlice({
  name: "AssignWard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveWardAssign: saveWardAssignData,
    saveWardAssignResponse: saveWardAssignResponseData,
    removeWardAssignResponse: removeWardAssignResponseData,
  },
});

// Get actions from created AssignWardSlice
const { saveWardAssign, saveWardAssignResponse, removeWardAssignResponse } =
  AssignWardSlice.actions;

const AssignWardSliceReducer = AssignWardSlice.reducer;

const selectWardAssign = ({ assignWard }) => assignWard.wardAssign ?? null;
const selectWardAssignErrorResponse = ({ assignWard }) =>
  assignWard.wardAssignResponse ?? null;

export {
  AssignWardSliceReducer,
  saveWardAssign,
  saveWardAssignResponse,
  removeWardAssignResponse,
  signOutAction,
  selectWardAssign,
  selectWardAssignErrorResponse,
};
