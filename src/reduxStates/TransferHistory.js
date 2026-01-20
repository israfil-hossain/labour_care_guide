import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  transferHistoryList: null,
  transferHistoryListResponse: null,
};

const saveTransferHistoryData = (state, action) => {
  state.transferHistoryList = action.payload;
  state.transferHistoryListResponse = null;
};

const saveTransferHistoryResponseData = (state, action) => {
  state.transferHistoryListResponse =
    action?.payload || state.transferHistoryListResponse;
};

const removeTransferHistoryResponseData = (state) => {
  state.transferHistoryListResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* HistoryTransfer slice */
const HistoryTransferSlice = createSlice({
  name: "HistoryTransfer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveTransferHistory: saveTransferHistoryData,
    saveTransferHistoryResponse: saveTransferHistoryResponseData,
    removeTransferHistoryResponse: removeTransferHistoryResponseData,
  },
});

// Get actions from created HistoryTransferSlice
const {
  saveTransferHistory,
  saveTransferHistoryResponse,
  removeTransferHistoryResponse,
} = HistoryTransferSlice.actions;

const HistoryTransferSliceReducer = HistoryTransferSlice.reducer;

const selectTranferHistory = ({ historyTransfer }) =>
  historyTransfer.transferHistoryList ?? null;

export {
  HistoryTransferSliceReducer,
  saveTransferHistory,
  saveTransferHistoryResponse,
  removeTransferHistoryResponse,
  signOutAction,
  selectTranferHistory
};
