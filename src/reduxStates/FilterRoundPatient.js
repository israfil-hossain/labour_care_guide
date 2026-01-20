import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  filterRoundData: null,
  filterRoundDataResponse: null,
};

const saveFilterRoundData = (state, action) => {
  state.filterRoundData = action.payload;
  state.filterRoundDataResponse = null;
};

const saveFilterRoundResponseData = (state, action) => {
  state.filterRoundDataResponse =
    action?.payload || state.filterRoundDataResponse;
};

const removeFilterRoundResponseData = (state) => {
  state.filterRoundDataResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* RoundFilter slice */
const RoundFilterSlice = createSlice({
  name: "RoundFilter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveFilterRound: saveFilterRoundData,
    saveFilterRoundResponse: saveFilterRoundResponseData,
    removeFilterRoundResponse: removeFilterRoundResponseData,
  },
});

// Get actions from created RoundFilterSlice
const { saveFilterRound, saveFilterRoundResponse, removeFilterRoundResponse } =
  RoundFilterSlice.actions;

const RoundFilterSliceReducer = RoundFilterSlice.reducer;

const selectFilterRound = ({ filterRound }) =>
  filterRound?.filterRoundData ?? null;

export {
  RoundFilterSliceReducer,
  saveFilterRound,
  saveFilterRoundResponse,
  removeFilterRoundResponse,
  signOutAction,
  selectFilterRound
};
