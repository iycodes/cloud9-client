import React from "react";
import styles from "./userPostsTabs.module.css";
import { Tab1 } from "./tab1";
import { Tab2 } from "./tab2";
import { Tab3 } from "./tab3";
import { Style } from "react-style-tag";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";

const layoutStyling = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

export const UserPostsTabs = () => {
  const [displayedTab, setDisplayedTab] = useState({
    tab1: null,
    tab2: null,
    tab3: null,
  });

  const handleTab1Click = () => {
    setDisplayedTab({
      ...displayedTab,
      tab1: true,
      tab2: false,
      tab3: false,
    });
  };
  const handleTab2Click = () => {
    setDisplayedTab({
      ...displayedTab,
      tab1: false,
      tab2: true,
      tab3: false,
    });
  };
  const handleTab3Click = () => {
    setDisplayedTab({
      ...displayedTab,
      tab1: false,
      tab2: false,
      tab3: true,
    });
  };

  const StyledTab = styled.li`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 32%;
    text-align: center;
    padding: 5px 0;
    height: auto;
    align-self: center;
    font-weight: 700;
    background-color: white;
    &:hover {
      background-color: rgba(186, 104, 200, 0.1);
    }
  `;
  const StyledTab1 = styled(StyledTab)`
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    ${displayedTab.tab1 ? "background-color: rgba(186, 104, 200, 0.4);" : ""}
    &:hover {
      ${displayedTab.tab1 ? "background-color: rgba(186, 104, 200, 0.4);" : ""}
    }
  `;
  const StyledTab2 = styled(StyledTab)`
    ${displayedTab.tab2 ? "background-color: rgba(186, 104, 200, 0.4);" : ""}
    &:hover {
      ${displayedTab.tab2 ? "background-color: rgba(186, 104, 200, 0.4);" : ""}
    }
  `;
  const StyledTab3 = styled(StyledTab)`
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    ${displayedTab.tab3 ? "background-color: rgba(186, 104, 200, 0.4);" : ""}
    &:hover {
      ${displayedTab.tab3 ? "background-color: rgba(186, 104, 200, 0.4);" : ""}
    }
  `;

  const tabsBarStyling = {
    listStyleType: "none",
    display: "flex",
    borderRadius: "10px",
    height: "auto",
    width: "80%",
    alignSelf: "center",
  };

  return (
    <>
      <div style={layoutStyling}>
        <ul className="nav" style={tabsBarStyling}>
          <StyledTab1 onClick={handleTab1Click}>My Activity</StyledTab1>
          <StyledTab2 onClick={handleTab2Click}>Reposts</StyledTab2>

          <StyledTab3 onClick={handleTab3Click}>Tab 3</StyledTab3>

          <MoreVertIcon
            style={{
              width: "4%",
            }}
            color="secondary"
          />
        </ul>
        <div className="outlet">
          <Tab1
            className={styles.layout}
            displayTab={
              displayedTab.tab1 == null || displayedTab.tab1 == true
                ? true
                : false
            }
          />
          <Tab2 displayTab={displayedTab?.tab2} />
          <Tab3 displayTab={displayedTab?.tab3} />
        </div>
      </div>
    </>
  );
};
