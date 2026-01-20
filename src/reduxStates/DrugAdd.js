import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  drugAddData: null,
  drugAddResponse: null,
};

const saveDrugAddData = (state, action) => {
  state.drugAddData = action.payload;
  state.drugAddResponse = null;
};

const saveDrugAddResponseData = (state, action) => {
  state.drugAddResponse = action?.payload || state.drugAddResponse;
};

const removeDrugAddResponseData = (state) => {
  state.drugAddResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* DrugAdd slice */
const DrugAddSlice = createSlice({
  name: "DrugAdd",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveDrugAdd: saveDrugAddData,
    saveDrugAddResponse: saveDrugAddResponseData,
    removeDrugAddResponse: removeDrugAddResponseData,
  },
});

// Get actions from created DrugAddSlice
const { saveDrugAdd, saveDrugAddResponse, removeDrugAddResponse } =
  DrugAddSlice.actions;

const DrugAddSliceReducer = DrugAddSlice.reducer;

const selectAddDrug = ({ drugsAdd }) => drugsAdd.drugAddData ?? null;

export {
  DrugAddSliceReducer,
  saveDrugAdd,
  saveDrugAddResponse,
  removeDrugAddResponse,
  signOutAction,
  selectAddDrug
};
