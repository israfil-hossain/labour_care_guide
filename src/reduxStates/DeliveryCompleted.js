import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  delCompleted: null,
  delCompletedResponse: null,
};

const saveDelCompletedData = (state, action) => {
  state.delCompleted = action.payload;
  state.delCompletedResponse = null;
};

const saveDelCompletedResponseData = (state, action) => {
  state.delCompletedResponse = action?.payload || state.delCompletedResponse;
};

const removeDelCompletedResponseData = (state) => {
  state.delCompletedResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* DeliveryCompleted slice */
const DeliveryCompletedSlice = createSlice({
  name: "DeliveryCompleted",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveDelCompleted: saveDelCompletedData,
    saveDelCompletedResponse: saveDelCompletedResponseData,
    removeDelCompletedResponse: removeDelCompletedResponseData,
  },
});

// Get actions from created DeliveryCompletedSlice
const {
  saveDelCompleted,
  saveDelCompletedResponse,
  removeDelCompletedResponse,
} = DeliveryCompletedSlice.actions;

const DeliveryCompletedSliceReducer = DeliveryCompletedSlice.reducer;

const selectDeliveryComplete = ({ completeDelivery }) =>
  completeDelivery.delCompleted ?? null;

export {
  DeliveryCompletedSliceReducer,
  saveDelCompleted,
  saveDelCompletedResponse,
  removeDelCompletedResponse,
  signOutAction,
  selectDeliveryComplete,
};
