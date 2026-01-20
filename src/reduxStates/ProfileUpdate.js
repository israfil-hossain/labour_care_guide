import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  profileUpdate: null,
  profileUpdateResponse: null,
};

const saveProfileUpdateData = (state, action) => {
  state.profileUpdate = action.payload;
  state.profileUpdateResponse = null;
};

const saveProfileUpdateResponseData = (state, action) => {
  state.profileUpdateResponse = action?.payload || state.profileUpdateResponse;
};

const removeProfileUpdateResponseData = (state) => {
  state.profileUpdateResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* UpdateProfile slice */
const UpdateProfileSlice = createSlice({
  name: "UpdateProfile",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveProfileUpdate: saveProfileUpdateData,
    saveProfileUpdateResponse: saveProfileUpdateResponseData,
    removeProfileUpdateResponse: removeProfileUpdateResponseData,
  },
});

// Get actions from created UpdateProfileSlice
const {
  saveProfileUpdate,
  saveProfileUpdateResponse,
  removeProfileUpdateResponse,
} = UpdateProfileSlice.actions;

const UpdateProfileSliceReducer = UpdateProfileSlice.reducer;

const selectProfileUpdate = ({ profileStaffUpdate }) =>
  profileStaffUpdate.profileUpdate ?? null;

export {
  UpdateProfileSliceReducer,
  saveProfileUpdate,
  saveProfileUpdateResponse,
  removeProfileUpdateResponse,
  signOutAction,
  selectProfileUpdate,
};
