import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  bishopScore: null,
  bishopScoreResponse: null,
};

const saveBishopScoreData = (state, action) => {
  state.bishopScore = action.payload;
  state.bishopScoreResponse = null;
};

const saveBishopScoreResponseData = (state, action) => {
  state.bishopScoreResponse = action?.payload || state.bishopScoreResponse;
};

const removeBishopScoreResponseData = (state) => {
  state.bishopScoreResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* BishopScore slice */
const BishopScoreSlice = createSlice({
  name: "BishopScore",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveBishopScore: saveBishopScoreData,
    saveBishopScoreResponse: saveBishopScoreResponseData,
    removeBishopScoreResponse: removeBishopScoreResponseData,
  },
});

// Get actions from created BishopScoreSlice
const { saveBishopScore, saveBishopScoreResponse, removeBishopScoreResponse } =
  BishopScoreSlice.actions;

const BishopScoreSliceReducer = BishopScoreSlice.reducer;

const selectBishopScore = ({ scoreBishop }) => scoreBishop.bishopScore ?? null;

export {
  BishopScoreSliceReducer,
  saveBishopScore,
  saveBishopScoreResponse,
  removeBishopScoreResponse,
  signOutAction,
  selectBishopScore,
};
