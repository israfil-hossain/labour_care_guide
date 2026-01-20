import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  /* user by default null */
  userData: {},
  /* login response */
  loginResponse: null,
  authToken: null,
  fcmDeviceToken: null,
};

/**
 * This function will save the user data when logging in successfull to redux
 * @param state : state
 * @param action : action
 */
const saveLoginUserData = (state, action) => {
  state.userData = action.payload;
  state.loginResponse = null;
};

const saveUserAuthTokenData = (state, action) => {
  state.authToken = action.payload;
};

const saveFCMTokenData = (state, action) => {
  state.fcmDeviceToken = action.payload;
};

/**
 * This function will save the login response to redux
 * @param state : state
 * @param action : action
 */
const saveLoginResponseData = (state, action) => {
  state.loginResponse = action?.payload || state.loginResponse;
};

/**
 * This function will remove the login response from redux
 * @param state : state
 */
const removeLoginResponseData = (state) => {
  state.loginResponse = null;
};

/* Signout Action */
const signOutAction = createAction("signout");

/* User slice */
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveUserLogin: saveLoginUserData,
    saveLoginResponse: saveLoginResponseData,
    saveUserAuthToken: saveUserAuthTokenData,
    saveFCMToken: saveFCMTokenData,
    removeLoginResponse: removeLoginResponseData,
  },
});

// Get actions from created UserSlice
const {
  saveUserLogin,
  saveLoginResponse,
  saveUserAuthToken,
  saveFCMToken,
  removeLoginResponse,
} = userSlice.actions;

// SELECTOR
const selectUser = ({ user }) => user.userData ?? null;
const selectIsUserLoggedIn = ({ user }) => !!(user && user.authToken);
const selectUserErrorResponse = ({ user }) => user.loginResponse ?? null;

const selectFcmToken = ({ user }) => user.fcmDeviceToken ?? null;

const userSliceReducer = userSlice.reducer;

export {
  userSliceReducer,
  saveUserLogin,
  saveLoginResponse,
  selectIsUserLoggedIn,
  selectUser,
  saveUserAuthToken,
  saveFCMToken,
  selectFcmToken,
  signOutAction,
  removeLoginResponse,
  selectUserErrorResponse,
};
