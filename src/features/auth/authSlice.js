import { createSlice } from "@reduxjs/toolkit";

//

const authSlice = createSlice({
  name: "auth",
  initialState: () => {
    const userId = window.localStorage.getItem("userId");
    const accessToken = window.localStorage.getItem("token");
    console.log(
      "redux initial state userId and access token are ",
      userId,
      "and",
      accessToken
    );
    return { userId: userId, accessToken: accessToken, userData: {} };
  },
  reducers: {
    setCredentials: (state, action) => {
      const userId = action.payload.userId;
      const accessToken = action.payload.accessToken;
      state.userId = userId;
      state.accessToken = accessToken;
      window.localStorage.setItem("userId", userId);
      window.localStorage.setItem("token", accessToken);
    },
    setUserdata: (state, action) => {},
    logout: (state, action) => {
      state.userId = null;
      state.accessToken = null;
    },
  },
});

export const selectCurrentUser = (state) => state.auth?.userId;
export const selectCurrentToken = (state) => state.auth?.accessToken;

export const { setCredentials, logout } = authSlice.actions;

export default authSlice;
