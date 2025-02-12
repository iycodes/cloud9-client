import React from "react";
import styles from "./UserPage.module.css";
import { Style } from "react-style-tag";
import { HeaderBar } from "../HeaderBar/HeaderBar";
import { TopTrendsCard } from "../TopTrendsCard/TopTrendsCard";
import { PostCard } from "../PostCard1/PostCard";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery } from "../../features/posts/postsApiSlice";
import { createContext } from "react";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserById } from "../../features/users/usersApiSlice";
import { UserPostsTabs } from "./postsTab/userPostsTabs";
import styled from "styled-components";
import { FollowButton } from "../FollowButton";
import { ArrowBack } from "@mui/icons-material";
//

//
export const StickyBar = styled.div`
  z-index: +1;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  min-height: 45px;
  min-width: 100%;
  width: 100%;
  top: 0px;
  position: sticky;
  padding: 0 20px;
`;

export const EachByUserPostContext = createContext();

export const UserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => selectUserById(state, userId));
  console.log(userId);
  //

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.header}>
          <HeaderBar />
        </div>
        <div className={styles.leftsidebar}>
          {" "}
          <ProfileCard userIdProp={userId} />{" "}
        </div>

        <div className={styles.main}>
          <div className={styles.stickyBar}>
            <div
              style={{
                width: "8%",
              }}
            >
              <IconButton
                onClick={() => {
                  navigate("../");
                }}
              >
                <ArrowBack color="secondary" />
              </IconButton>
            </div>

            <div
              style={{
                margin: "0 auto",
              }}
            >
              {user?.name}
            </div>
            <FollowButton userToFollowId={userId} />
          </div>
          <div className={styles.miniProfile}>
            <img src={user?.coverImageSrc} />
          </div>
          <UserPostsTabs />
        </div>
        {/* <div className={styles.rightsidebar}>
          {" "}
          <TopTrendsCard />{" "}
        </div> */}
      </div>
    </>
  );
};
