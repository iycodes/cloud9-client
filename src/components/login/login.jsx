import styles from "./login.module.css";
import React, { useState, useContext } from "react";

import { Alert, AlertTitle } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Style } from "react-style-tag";
import { AuthContext } from "../../Authentication/AuthContext";
import { Bars } from "react-loader-spinner";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { store } from "../../app/store";
import Lottie from "lottie-react";
import lottie_anim from "../../assets/lottie/E0G3c5GqdE.json";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [login] = useLoginMutation();
  const [formErrors, setFormErrors] = useState({});
  const [logInError, setLogInError] = useState("");
  const [logInSuccess, setLogInSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };
  // console.log(currentUser.email);
  const validate = async (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Please type in your email";
    }
    if (!values.password) {
      errors.password = "Please type in your password";
    } else {
      try {
        setLoading(true);
        const response = await login({
          email: formValues.email,
          password: formValues.password,
        }).unwrap();
        console.log("response from login is ", response);
        window.localStorage.setItem("userId", response.userId);
        window.localStorage.setItem("token", response.accessToken);
        dispatch(setCredentials({ ...response }));
        // if(response.originalStatus>299){
        //   dispatch(setCredentials({ ...response }));
        // }else if(response.originalStatus<500){
        //   console.log("http response status code between 300 and 500")
        //   setLogInError("Invalid Credentials!");
        // }else {
        //   setLogInError("Error during login!");
        // }
        console.log(store.getState());
        navigate("/");
      } catch (err) {
        // setLogInError("Error during login");
        if(err.originalStatus<500 || err.status < 500){
          console.log("http response status code between 300 and 500")
          setLogInError("Invalid Credentials!");
        }else {
          setLogInError("Error during login!");
        }
        console.log(err);
      }
      setLoading(false);

      // return Lol();
    }
    return errors;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topText}>
        <div className={styles.shape}> </div> Cloud9
      </div>
      <div className={styles.layout}>
        <div className={styles.leftSide}>
          {logInSuccess && <Alert severity="success">{logInSuccess}</Alert>}
          {logInError && (
            <Alert severity="error">
              {/* <AlertTitle>Error</AlertTitle> */}
              {logInError}
            </Alert>
          )}
          <div className={styles.form_wrapper}>
            <form onSubmit={submitHandler} className={styles.form}>
              <Lottie
                // options={defaultOptions}
                animationData={lottie_anim}
                loop={true}
                className={styles.lottie_anim}
              />
              <div className={styles.form_Header}>
                <h1>Welcome Back</h1>
                <p>please enter your details to continue</p>
              </div>
              <div className={styles.form_Field}>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={formValues.email}
                  onChange={changeHandler}
                />{" "}
              </div>{" "}
              <p className={styles.error}>{formErrors.email}</p>
              <div className={styles.form_Field}>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={formValues.password}
                  onChange={changeHandler}
                />
              </div>{" "}
              <p className={styles.error}>{formErrors.password}</p>
              <div className={styles.ForgotPassword}>
                <Link to="/forgotpassword">Forgot password?</Link>
              </div>
              <button type="submit" disabled={loading}>
                {loading ? (
                  <Bars
                    height="30px"
                    // width="80"
                    color="white"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ) : (
                  "Sign in"
                )}
              </button>
              <div className={styles.signUpRoute}>
                {" "}
                Don't have an account? <Link to="/signup"> SignUp </Link>
              </div>
            </form>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.section1}></div>
          <div className={styles.section2}></div>
          <div className={styles.section3}></div>
          <div className={styles.section4}></div>
          <div className={styles.section5}></div>
          <div className={styles.section6}></div>
          <div className={styles.section7}></div>
        </div>
      </div>
    </div>
  );
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: lottie_anim,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
