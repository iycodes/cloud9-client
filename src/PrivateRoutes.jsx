import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Homepage } from "./components/Homepage/Homepage";
import { Login } from "./components/login/login";
import { SignUp } from "./components/signup/signup";
import { VerifyEmailPage } from "./VerifyEmailPage";
import { selectCurrentToken } from "./features/auth/authSlice";
import { selectCurrentUser } from "./features/auth/authSlice";
import { useSelector } from "react-redux";
import {
  useFetchUserByIdQuery,
  useIsEmailVerifiedQuery,
} from "./features/users/usersApiSlice";
import { AuthContext } from "./Authentication/AuthContext";
import { useContext } from "react";

//

// console.log(token);
export const PrivateRoutes_LoggedIn = () => {
  const accessToken = useSelector(selectCurrentToken);
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};
export const PrivateRoutes_EmailVerified =  () => {

  const userId = useSelector(selectCurrentUser);
  const isEmailVerified = useIsEmailVerifiedQuery(userId)
  console.log("isEmailVerified is",isEmailVerified);
    const authContext = useContext(AuthContext);
    const authUserData = authContext?.authUserData;

  // return <Outlet />;
  
  // return authUserData?.isEmailVerified ? <Outlet /> : <Navigate to="/verify_email" />;
  return authUserData?.isEmailVerified == false ? <VerifyEmailPage/> :<Outlet /> 
};

export const PrivateRoutes_LoginPage = () => {
  const accessToken = useSelector(selectCurrentToken);
  console.log("private route, accessToken is", accessToken)
  return accessToken ? <Navigate to="/" /> : <Login />;
};

export const PrivateRoutes_SignUpPage = () => {
  const accessToken = useSelector(selectCurrentToken);
  return accessToken ? <Navigate to="/" /> : <SignUp />;
  // return <SignUp />;
};
