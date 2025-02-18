import styles from "./VerifyEmailPage.module.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Style } from "react-style-tag";
import mailIcon from "./assets/SVGs/mail2.svg";
import { Button } from "@mui/material";
import cloud9Icon from "./assets/SVGs/cloud9purple.png";
import {
  useIsEmailVerifiedQuery,
  useLazyIsEmailVerifiedQuery,
  useSendEmailVerificationMutation,
} from "./features/users/usersApiSlice";
import { store } from "./app/store";
import { useContext } from "react";
import { AuthContext } from "./Authentication/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import { da } from "date-fns/locale";

//

//

const Main = styled.div`
  min-width: 599px;
  height: 80vh;
  min-height: 512px;
  max-height: 699px;
  max-width: 999px;
  width: 80vw;
  margin: 10vh 0;
  border-radius: 18px;
  display: flex;
  flex-direction: row;

  background-color: #f2f5f9;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border: 4px solid #d2d0e0;
`;

const LeftSide = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const Layout1 = styled.div`
  min-width: 200px;
  height: 100%;
  padding: 0 5% 0 5%;
  border: 3px solid #f2f5f9;
  /* max-width: 400px; */
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  border-radius: 10px;
  text-align: center;
`;
const Logo = styled.img`
  aspect-ratio: 1/1;
  display: flex;
  width: 100px;
`;
const MailIconDiv = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const MailIcon = styled.img`
  width: 150px;
  margin-bottom: 10px;
`;

const StyledButton = styled.button``;

const Div1 = styled.div`
  font-size: xx-large;
  font-weight: 500;
  color: #702963;
`;

const Div2 = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const Div3 = styled.div`
  /* display: flex; */
  margin-bottom: 20px;
`;
const Div4Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-bottom: 5%;
`;
const Div4 = styled.div`
  width: 100%;
  text-align: right;
  align-self: flex-end;
  justify-self: flex-end;
`;

const LoginLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  color: #702963;
`;

//
const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  height: 1fr;
  width: 40%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const Section1 = styled.div`
  width: 100%;
  background-color: #b19cd8;
`;
const Section2 = styled.div`
  background-color: #bea9df;

  width: 100%;
`;
const Section3 = styled.div`
  width: 100%;
  background-color: #cbb7e5;
`;
const Section4 = styled.div`
  background-color: #d9c4ec;

  width: 100%;
`;
const Section5 = styled.div`
  background-color: #e6d1f2;
  width: 100%;
`;
const Section6 = styled.div`
  background-color: #b19cd8;
  width: 100%;
`;
const Section7 = styled.div`
  background-color: #bea9df;
  width: 100%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

//
export const VerifyEmailPage = () => {
  const userId = store.getState().auth?.userId;

  const authContext = useContext(AuthContext);
  const authUserData = authContext?.authUserData;

  const [sendEmailVerification] = useSendEmailVerificationMutation();
  const navigate = useNavigate();

  const [trigger, { isLoading }] = useLazyIsEmailVerifiedQuery();

  //

  const verifyEmail = async () => {
    await sendEmailVerification(userId);
    setTimer(30);
  };

  const [timer, setTimer] = useState(30);
  useEffect(() => {
    sendEmailVerification(userId);
  }, []);
  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  //

  const handleLogin = async () => {
    if (isLoading) {
      console.log("prev request still loading");
      return;
    }
    try {
      toast.loading("Checking...", { id: "toast1" });
      const { isSuccess, data, isError } = await trigger(userId);
      // await trigger(userId);
      if (isError) {
        toast.error("Error verifying", { id: "toast1" });
      }
      console.log("isEmailVerified is", data);
      if (isSuccess) {
        console.log("api reuest for email verification check is succesful");
        if (data == true) {
          authContext.authUserData = {
            ...authContext.authUserData,
            isEnailVerified: true,
          };
          toast.success("Verified!", { id: "toast1" });
          // navigate("/");
          window.location.reload();
        } else {
          toast.error("Email yet to be verified!", { id: "toast1" });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error verifying", { id: "toast1" });
    }
  };

  //

  //
  return (
    <div className={styles.layout}>
      <Toaster richColors />
      <Main id="verify_email">
        <LeftSide>
          <div className={styles.topText}>
            <div className={styles.shape}> </div> Cloud9
          </div>
          <Layout1>
            {/* <Logo src={cloud9Icon} alt="" /> */}
            <MailIconDiv>
              <MailIcon src={mailIcon} alt="mailiIcon" />
              <Div1> VERIFY YOUR EMAIL </Div1>
            </MailIconDiv>

            <Div2>
              We've sent an email to {authUserData?.email}, click the link in
              the email to verify and activate your account. <br /> The link is
              valid for 24hrs.
            </Div2>
            <Div3>
              Didn't get the email?
              <Button
                variant="contained"
                disableElevation
                disabled={timer == 0 ? false : true}
                onClick={verifyEmail}
                sx={{
                  marginLeft: "5px",
                  fontSize: "0.7rem",
                  width: "60px",
                  height: "30px",
                }}
              >
                {timer == 0 ? "resend" : timer}
              </Button>
            </Div3>
            <Div4Wrapper>
              <Div4>
                Verified your email?
                <LoginLink onClick={handleLogin}> Proceed</LoginLink>
              </Div4>
            </Div4Wrapper>
          </Layout1>
        </LeftSide>
        <RightSide>
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
          <Section6 />
          <Section7 />
        </RightSide>
      </Main>
    </div>
  );
};
