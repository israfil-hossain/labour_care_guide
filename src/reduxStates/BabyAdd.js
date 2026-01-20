import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  addBaby: null,
  addBabyResponse: null,
};

const saveAddBabyData = (state, action) => {
  state.addBaby = action.payload;
  state.addBabyResponse = null;
};

const saveAddBabyResponseData = (state, action) => {
  state.addBabyResponse = action?.payload || state.addBabyResponse;
};

const removeAddBabyResponseData = (state) => {
  state.addBabyResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* BabyAdd slice */
const BabyAddSlice = createSlice({
  name: "BabyAdd",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveAddBaby: saveAddBabyData,
    saveAddBabyResponse: saveAddBabyResponseData,
    removeAddBabyResponse: removeAddBabyResponseData,
  },
});

// Get actions from created BabyAddSlice
const { saveAddBaby, saveAddBabyResponse, removeAddBabyResponse } =
  BabyAddSlice.actions;

const BabyAddSliceReducer = BabyAddSlice.reducer;

const selectAddBaby = ({ babyAdd }) => babyAdd.addBaby ?? null;

export {
  BabyAddSliceReducer,
  saveAddBaby,
  saveAddBabyResponse,
  removeAddBabyResponse,
  signOutAction,
  selectAddBaby
};
