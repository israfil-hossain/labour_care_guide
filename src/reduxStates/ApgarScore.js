import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  apgarScore: null,
  apgarScoreResponse: null,
};

const saveApgarScoreData = (state, action) => {
  state.apgarScore = action.payload;
  state.apgarScoreResponse = null;
};

const saveApgarScoreResponseData = (state, action) => {
  state.apgarScoreResponse = action?.payload || state.apgarScoreResponse;
};

const removeApgarScoreResponseData = (state) => {
  state.apgarScoreResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* ApgarScore slice */
const ApgarScoreSlice = createSlice({
  name: "ApgarScore",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveApgarScore: saveApgarScoreData,
    saveApgarScoreResponse: saveApgarScoreResponseData,
    removeApgarScoreResponse: removeApgarScoreResponseData,
  },
});

// Get actions from created ApgarScoreSlice
const { saveApgarScore, saveApgarScoreResponse, removeApgarScoreResponse } =
  ApgarScoreSlice.actions;

const ApgarScoreSliceReducer = ApgarScoreSlice.reducer;

const selectApgar = ({ scoreApgar }) => scoreApgar.apgarScore ?? null;

export {
  ApgarScoreSliceReducer,
  saveApgarScore,
  saveApgarScoreResponse,
  removeApgarScoreResponse,
  signOutAction,
  selectApgar,
};
