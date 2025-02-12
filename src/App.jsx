import { ProfilePage } from "./components/profilePage/profilePage";
// import { SignUp } from "./components/signup/signup";
// import { Login } from "./components/login/login";
import { Homepage } from "./components/Homepage/Homepage";
import "./App.css";
import { AuthProvider } from "./Authentication/AuthContext";
import {
  PrivateRoutes_EmailVerified,
  PrivateRoutes_LoggedIn,
  PrivateRoutes_LoginPage,
  PrivateRoutes_SignUpPage,
} from "./PrivateRoutes";

import { Routes, Route } from "react-router-dom";
import { UserPage } from "./components/UserPage/UserPage";

import { FullPostPage } from "./components/FullPostPage/fullPostPage";
import { VerifyEmailPage } from "./VerifyEmailPage";
import { UserSettings } from "./components/UserSettings/UserSettings";
import { ForgotPassword } from "./components/ForgotPassword/ForgotPassword";
import { Login } from "./components/login/login";
import { SignUp } from "./components/signup/signup";
//
//

function App() {
  return (
    <>
    {/* <SignUp/> */}
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<PrivateRoutes_LoginPage />} />
          <Route element={<PrivateRoutes_LoggedIn />}>
            <Route path="/verify_email" element={<VerifyEmailPage />} />
            <Route element={<PrivateRoutes_EmailVerified />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/settings" element={<UserSettings />} />
              <Route path="/user/:userId" element={<UserPage />} />
              <Route path="/post/:postId" element={<FullPostPage />} />
            </Route>
          </Route>

          <Route path="/signup" element={<PrivateRoutes_SignUpPage />} />

          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
