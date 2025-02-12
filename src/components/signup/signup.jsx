// import styles from "./signup.module.css";
import styles from "./signup.module.css";
import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link, useNavigate } from "react-router-dom";
import { Style } from "react-style-tag";
import { Bars } from "react-loader-spinner";
import { useCreateUserMutation } from "../../features/users/usersApiSlice";
import cloud9Icon from "../../assets/SVGs/cloud9purple.png";
import styled from "styled-components";
import anim from "../../assets/lottie/Animation_1702476191986.json";
import Lottie from "lottie-react";
import { useRef } from "react";

//

//

const Error = styled.p`
  color: #7d57d9;
  max-width: 80%;
  margin-top: 3px;
  font-size: small;
  opacity: 1;
  display: ${(props) => (props.show == true ? "flex" : "none")};
`;
//
export const SignUp = () => {
  const [createUser, { isSuccess }] = useCreateUserMutation();

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();
  const passwordFieldRef = useRef()
  const [formErrors, setFormErrors] = useState({});
  const [submitClicked, setSubmitClicked] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);
    console.log(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setSubmitClicked(true);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && submitClicked) {
      console.log(formValues);
    }
  }, [submitClicked]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    // const usernameRegex = /^[a-zA-Z0-9_.]+$/;
    const nameRegex = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/;
    if (!nameRegex.test(values.firstname)) {
      errors.firstname = "type beta name boss";
    } else if (!nameRegex.test(values.lastname)) {
      errors.lastname = "abeg, type better name boss";
    } else if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "invalid email address";
    } else if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "password should be atleast 8 characters long  ";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Given passwords are different";
    } else {
      async function lol() {
        try {
          setSignUpError("");
          setSignUpSuccess("");
          setLoading(true);
          await createUser({
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            email: formValues.email,
            gender: formValues.gender,
            displayName: formValues.firstname,
            password: formValues.password,
          }).unwrap();
          setSignUpSuccess(true);
          console.log("user created succedfully");
          navigate("/verify_email");
        } catch (error) {
          console.log(error);
          setFormErrors({
            email: error?.data?.message,
          });

          setSignUpError("Failed to create account");
        }
        setLoading(false);
      }
      return lol();
    }

    return errors;
  };
function showPasssword(){
  if(passwordFieldRef.current.getAttribute("type")=="text"){
    passwordFieldRef.current.setAttribute("type", "password")
    return;
    }
passwordFieldRef.current.setAttribute("type", "text")
console.log("password shown")

}
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.topText}>
          <div className={styles.shape}> </div> Cloud9
        </div>
        <div className={styles.layout}>
          <div className={styles.leftSide}>
            <div className={styles.form_wrapper}>
              {/* {signUpError && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {signUpError}
                </Alert> 
              )} */}
              <form onSubmit={submitHandler} className={styles.form}>
                <Lottie
                  animationData={anim}
                  loop={true}
                  className={styles.lottie_anim}
                />
                <div className={styles.form_Header}>
                  {/* <h1>Sign in to Cloud9 </h1> */}
                  <h2>Sign up for Cloud9 </h2>

                  {/* <p>New here? enter your details to register</p> */}
                </div>
                <div className={styles.name}>
                  <div className={styles.form_Field}>
                    <label>Firstname</label>
                    <input
                      type="firstname"
                      name="firstname"
                      placeholder="firstname"
                      value={formValues.firstname}
                      onChange={onChangeHandler}
                    />
                    <Error
                      show={formErrors?.firstname ? true : false}
                      className={styles.error}
                    >
                      {formErrors.firstname}
                    </Error>
                  </div>
                  <div className={styles.form_Field}>
                    <label>Lastname</label>
                    <input
                      type="lastname"
                      name="lastname"
                      placeholder="lastname"
                      value={formValues.lastname}
                      onChange={onChangeHandler}
                    />
                    <Error
                      show={formErrors?.lastname ? true : false}
                      className={styles.error}
                    >
                      {formErrors.lastname}
                    </Error>
                  </div>
                </div>
                <div className={styles.email_gender}>
                  <div className={styles.form_Field}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      value={formValues.email}
                      onChange={onChangeHandler}
                    />
                    <Error
                      show={formErrors?.email ? true : false}
                      className={styles.error}
                    >
                      {formErrors.email}
                    </Error>
                  </div>
                  <div className={styles.form_Field}>
                    <label>Gender</label>
                    <select
                    className={styles.gender}
                      name="gender"
                      id="gender"
                      // onSelect={onChangeHandler}
                      onChange={onChangeHandler}
                    >
                      <option></option>
                      <option value="male">male</option>
                      <option value="female"> female</option>
                    </select>
                  </div>
                </div>
                <div className={styles.form_Field}>
                  <label>Password</label>
                  <input
                  ref={passwordFieldRef}
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formValues.password}
                    onChange={onChangeHandler}
                  />
                  <Error
                    show={formErrors?.password ? true : false}
                    className={styles.error}
                  >
                    {formErrors.password}
                  </Error>
                  <div className={styles.show_password} >
                  <input  onChange={showPasssword} type="checkbox" />Show password
                  </div>
                </div>
                <div className={styles.form_Field}>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder=" password"
                    value={formValues.confirmPassword}
                    onChange={onChangeHandler}
                  />
                  <Error
                    show={formErrors?.confirmPassword ? true : false}
                    className={styles.error}
                  >
                    {formErrors.confirmPassword}
                  </Error>
                </div>
           

                <button disabled={loading} type="submit">
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
                    "Sign up"
                  )}
                </button>
                <div className={styles.loginRoute}>
                  {" "}
                  Already have an account? <Link to="/login"> Login </Link>
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
      </div>
    </>
  );
};
