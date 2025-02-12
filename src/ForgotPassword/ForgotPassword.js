import styles from "./ForgotPassword.module.css";
import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Alert, AlertTitle } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Style } from "react-style-tag";

export const ForgotPassword = () => {
  //   const { logIn, currentUser } = useAuthContext();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };
  // console.log(currentUser.email);
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Please type in your email";
    } else {
      async function Lol() {
        try {
          setLoading(true);
          setError("");
          setSuccess("");
          console.log("reset password is yet to be implemented");
          setSuccess("Check your inbox for further instructions");
        } catch {
          setError("Failed to reset password");
        }
        setLoading(false);
      }
      return Lol();
    }
    return errors;
  };

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.leftSide}>
          <div className={styles.topText}>
            {" "}
            <div className={styles.shape}> </div> Cloud9
          </div>
          {success && <Alert severity="success">{success}</Alert>}
          {error && (
            <Alert severity="error">
              {/* <AlertTitle>Error</AlertTitle> */}
              {error}
            </Alert>
          )}
          <div className={styles.form_wrapper}>
            <form onSubmit={submitHandler} className={styles.form}>
              <div className={styles.form_Header}>
                <h1> Forgot Your Password?</h1>
                {/* <p>Welcome back! please enter your details</p> */}
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
              <p className={styles.error}>{formErrors.password}</p>
              <button type="submit" disabled={loading}>
                Reset Password
              </button>
              <div className={styles.loginRoute}>
                Done?.. <Link to="/login"> Login</Link>
              </div>
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
      </div>{" "}
    </>
  );
};
