import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  decisionLcg: null,
  decisionLcgResponse: null,
};

const saveDecisionLcgData = (state, action) => {
  state.decisionLcg = action.payload;
  state.decisionLcgResponse = null;
};

const saveDecisionLcgResponseData = (state, action) => {
  state.decisionLcgResponse = action?.payload || state.decisionLcgResponse;
};

const removeDecisionLcgResponseData = (state) => {
  state.decisionLcgResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* DecisionLcg slice */
const DecisionLcgSlice = createSlice({
  name: "DecisionLcg",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveDecisionLcg: saveDecisionLcgData,
    saveDecisionLcgResponse: saveDecisionLcgResponseData,
    removeDecisionLcgResponse: removeDecisionLcgResponseData,
  },
});

// Get actions from created DecisionLcgSlice
const { saveDecisionLcg, saveDecisionLcgResponse, removeDecisionLcgResponse } =
  DecisionLcgSlice.actions;

const DecisionLcgSliceReducer = DecisionLcgSlice.reducer;

const selectDecisionLcg = ({ lcgDecision }) => lcgDecision.decisionLcg ?? null;

export {
  DecisionLcgSliceReducer,
  saveDecisionLcg,
  saveDecisionLcgResponse,
  removeDecisionLcgResponse,
  signOutAction,
  selectDecisionLcg
};
