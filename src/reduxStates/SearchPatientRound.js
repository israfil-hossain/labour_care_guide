import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  roundsearchList: null,
  roundsearchListResponse: null,
};

const saveRoundSearchListData = (state, action) => {
  state.roundsearchList = action.payload;
  state.roundsearchListResponse = null;
};

const saveRoundSearchListResponseData = (state, action) => {
  state.roundsearchListResponse =
    action?.payload || state.roundsearchListResponse;
};

const removeRoundSearchListResponseData = (state) => {
  state.roundsearchListResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* RoundPatientSearch slice */
const RoundPatientSearchSlice = createSlice({
  name: "RoundPatientSearch",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveRoundSearchList: saveRoundSearchListData,
    saveRoundSearchListResponse: saveRoundSearchListResponseData,
    removeRoundSearchListResponse: removeRoundSearchListResponseData,
  },
});

// Get actions from created RoundPatientSearchSlice
const {
  saveRoundSearchList,
  saveRoundSearchListResponse,
  removeRoundSearchListResponse,
} = RoundPatientSearchSlice.actions;

const RoundPatientSearchSliceReducer = RoundPatientSearchSlice.reducer;

const selectSearchRound = ({ searchRound }) =>
  searchRound?.roundsearchList ?? [];

export {
  RoundPatientSearchSliceReducer,
  saveRoundSearchList,
  saveRoundSearchListResponse,
  removeRoundSearchListResponse,
  signOutAction,
  selectSearchRound,
};
