import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  lcgAdd: null,
  lcgAddResponse: null,
};

const saveLcgAddData = (state, action) => {
  state.lcgAdd = action.payload;
  state.lcgAddResponse = null;
};

const saveLcgAddResponseData = (state, action) => {
  state.lcgAddResponse = action?.payload || state.lcgAddResponse;
};

const removeLcgAddResponseData = (state) => {
  state.lcgAddResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* AddLcg slice */
const AddLcgSlice = createSlice({
  name: "AddLcg",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveLcgAdd: saveLcgAddData,
    saveLcgAddResponse: saveLcgAddResponseData,
    removeLcgAddResponse: removeLcgAddResponseData,
  },
});

// Get actions from created AddLcgSlice
const { saveLcgAdd, saveLcgAddResponse, removeLcgAddResponse } =
  AddLcgSlice.actions;

const AddLcgSliceReducer = AddLcgSlice.reducer;

const selectLcgAdd = ({ addLcg }) => addLcg.lcgAdd ?? null;

export {
  AddLcgSliceReducer,
  saveLcgAdd,
  saveLcgAddResponse,
  removeLcgAddResponse,
  signOutAction,
  selectLcgAdd
};
