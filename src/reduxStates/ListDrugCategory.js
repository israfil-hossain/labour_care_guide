import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  drugCategoryList: null,
  drugCategoryListResponse: null,
};

const saveDrugCategoryListData = (state, action) => {
  state.drugCategoryList = action.payload;
  state.drugCategoryListResponse = null;
};

const saveDrugCategoryListResponseData = (state, action) => {
  state.drugCategoryListResponse =
    action?.payload || state.drugCategoryListResponse;
};

const removeDrugCategoryListResponseData = (state) => {
  state.drugCategoryListResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* DrugCategoryList slice */
const DrugCategoryListSlice = createSlice({
  name: "DrugCategoryList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveDrugCategoryList: saveDrugCategoryListData,
    saveDrugCategoryListResponse: saveDrugCategoryListResponseData,
    removeDrugCategoryListResponse: removeDrugCategoryListResponseData,
  },
});

// Get actions from created DrugCategoryListSlice
const {
  saveDrugCategoryList,
  saveDrugCategoryListResponse,
  removeDrugCategoryListResponse,
} = DrugCategoryListSlice.actions;

const DrugCategoryListSliceReducer = DrugCategoryListSlice.reducer;

const selectDrugList = ({categoryDrugList})=> categoryDrugList.drugCategoryList

export {
  DrugCategoryListSliceReducer,
  saveDrugCategoryList,
  saveDrugCategoryListResponse,
  removeDrugCategoryListResponse,
  signOutAction,
  selectDrugList
};
