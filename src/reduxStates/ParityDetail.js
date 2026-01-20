import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  listParity: null,
  listParityResponse: null,
};

const saveListParityData = (state, action) => {
  state.listParity = action.payload;
  state.listParityResponse = null;
};

const saveListParityResponseData = (state, action) => {
  state.listParityResponse = action?.payload || state.listParityResponse;
};

const removeListParityResponseData = (state) => {
  state.listParityResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* ParityList slice */
const ParityListSlice = createSlice({
  name: "ParityList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveListParity: saveListParityData,
    saveListParityResponse: saveListParityResponseData,
    removeListParityResponse: removeListParityResponseData,
  },
});

// Get actions from created ParityListSlice
const { saveListParity, saveListParityResponse, removeListParityResponse } =
  ParityListSlice.actions;

const ParityListSliceReducer = ParityListSlice.reducer;

const selectParityList = ({ parityList }) => parityList.listParity ?? null;

export {
  ParityListSliceReducer,
  saveListParity,
  saveListParityResponse,
  removeListParityResponse,
  signOutAction,
  selectParityList
};
