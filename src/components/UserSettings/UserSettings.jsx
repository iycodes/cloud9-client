import React, { useState } from "react";
import styles from "./UserSettings.module.css";
import styled from "styled-components";
import { Style } from "react-style-tag";
import { UserDetails } from "./UserDetails";
import { IoSettings } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { GeneralSettings_Tab } from "./GeneralSettings";
// import { Style } from "react-style-tag";
//
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: white;
  margin: 0;
`;
const Header = styled.h2``;

const Line = styled.div`
  display: flex;
  height: 1px;
  width: 100%;
  border: 0.7px solid grey;
  opacity: 0.1;
  margin-bottom: 20px;
`;

const Body = styled.div`
  display: flex;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  margin-right: 20px;
`;
const Tab = styled.div`
  display: flex;
  /* width: auto; */
  margin-bottom: 5px;
  /* font-weight: 500; */
  opacity: 0.8;
  font-size: 0.9em;
  padding: 8px;
  border-radius: 5px;
  background-color: ${(props) => (props.displayedTab ? "#f2edf7" : "")};
  font-weight: ${(props) => (props.displayedTab ? "650" : "500")};
`;
const Space = styled.div`
  display: flex;
  width: 20%;
`;

//
export const UserSettings = () => {
  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);

  //
  return (
    <>
      <Style>
        {`
          body{
 
  padding:0 50px;
  // margin:0 auto;
  


          }
        `}
      </Style>
      <Layout>
        <Header>Settings</Header>
        <Line />
        <Body>
          <Tabs>
            <Tab
              onClick={() => {
                setTab1(true);
                setTab2(false);
              }}
              displayedTab={tab1}
            >
              My details <FaUserEdit className={styles.tabIcon} color="" />
            </Tab>
            <Tab
              onClick={() => {
                setTab1(false);
                setTab2(true);
              }}
              displayedTab={tab2}
            >
              General <IoSettings className={styles.tabIcon} color="" />
            </Tab>
          </Tabs>
          <Space />
          <UserDetails displayedTab={tab1} />
          <GeneralSettings_Tab displayedTab={tab2} />
        </Body>
      </Layout>
    </>
  );
};
