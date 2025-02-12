import { useState, useEffect, createContext } from "react";

import { useFetchUserByIdQuery } from "../features/users/usersApiSlice";
import { store } from "../app/store";
//

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const authToken = window.localStorage.getItem("token");
  const userId_storage = window.localStorage.getItem("userId");
  console.log("userId_storage is",userId_storage);
  
  const userId = store.getState().auth?.userId ?? userId_storage;
  const authUserDataApiRequest = useFetchUserByIdQuery(userId)
  const authUserData = authUserDataApiRequest.data;

  // console.log("authUserData is",authUserData);
useEffect(() => {
  console.log("authUserDataApiRequest api request did something.  authUserDataApiRequest is", authUserDataApiRequest)

  return () => {
    
  }
}, [authUserData])


  return (
    <>
      <AuthContext.Provider
        value={{
          authUserData,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
