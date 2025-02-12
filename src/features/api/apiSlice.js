import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
import { logout, setCredentials } from "../auth/authSlice";

//

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3005",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.accessToken;
    console.log(token);
    // if (token) {
    headers.set("authorization", `Bearer ${token}`);
    headers.set("content-type", "application/json");
    // }

    return headers;
  },
});

const baseQueryForReAuth = async (arg, api, extraOptions) => {
  console.log("baseQueryForReAuth function called");
  let result = baseQuery(arg, api, extraOptions);
  console.log("result is ", result);
  if (result?.originalStatus === 403) {
    /* from our backend we specifically sent a 403 response for an 
    invalid or expired token */
    const reAuthResult = baseQuery("/auth/refresh", api, extraOptions);
    console.log(reAuthResult);
    const newAccessToken = reAuthResult?.data;
    if (newAccessToken) {
      const userId = api.getState().auth.userId;
      api.dispatch(setCredentials({ ...newAccessToken, userId: userId }));
      //retrying out original request again below
      result = baseQuery(arg, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryForReAuth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "http://localhost:3005",
  //   credentials: "include",
  //   prepareHeaders:
  //     (headers,
  //     ({ getState }) => {
  //       const token = getState().auth.token;
  //       if (token) {
  //         headers.set("authorization", `Bearer ${token}`);
  //       }
  //       return headers;
  //     }),
  // }),
  tagTypes: [
    "Post",
    "SinglePost",
    "User",
    "Comment",
    "SingleComment",
    "Follows",
  ],
  endpoints: (builder) => ({}),
});
