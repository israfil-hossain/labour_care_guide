import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  editBaby: null,
  editBabyResponse: null,
};

const saveEditBabyData = (state, action) => {
  state.editBaby = action.payload;
  state.editBabyResponse = null;
};

const saveEditBabyResponseData = (state, action) => {
  state.editBabyResponse = action?.payload || state.editBabyResponse;
};

const removeEditBabyResponseData = (state) => {
  state.editBabyResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* BabyEdit slice */
const BabyEditSlice = createSlice({
  name: "BabyEdit",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveEditBaby: saveEditBabyData,
    saveEditBabyResponse: saveEditBabyResponseData,
    removeEditBabyResponse: removeEditBabyResponseData,
  },
});

// Get actions from created BabyEditSlice
const { saveEditBaby, saveEditBabyResponse, removeEditBabyResponse } =
  BabyEditSlice.actions;

const BabyEditSliceReducer = BabyEditSlice.reducer;

const selectEditBaby = ({ updateBaby }) => updateBaby.editBaby ?? null;

export {
  BabyEditSliceReducer,
  saveEditBaby,
  saveEditBabyResponse,
  removeEditBabyResponse,
  signOutAction,
  selectEditBaby,
};
