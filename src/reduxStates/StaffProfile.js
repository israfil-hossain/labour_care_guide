import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  profileDetail: null,
  profileDetailResponse: null,
};

const saveProfileDetailData = (state, action) => {
  state.profileDetail = action.payload;
  state.profileDetailResponse = null;
};

const saveProfileDetailResponseData = (state, action) => {
  state.profileDetailResponse = action?.payload || state.profileDetailResponse;
};

const removeProfileDetailResponseData = (state) => {
  state.profileDetailResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* UserProfile slice */
const UserProfileSlice = createSlice({
  name: "UserProfile",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveProfileDetail: saveProfileDetailData,
    saveProfileDetailResponse: saveProfileDetailResponseData,
    removeProfileDetailResponse: removeProfileDetailResponseData,
  },
});

// Get actions from created UserProfileSlice
const {
  saveProfileDetail,
  saveProfileDetailResponse,
  removeProfileDetailResponse,
} = UserProfileSlice.actions;

const UserProfileSliceReducer = UserProfileSlice.reducer;

const selectStaffProfile = ({ profileStaff }) =>
  profileStaff.profileDetail ?? null;

export {
  UserProfileSliceReducer,
  saveProfileDetail,
  saveProfileDetailResponse,
  removeProfileDetailResponse,
  signOutAction,
  selectStaffProfile,
};
