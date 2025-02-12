import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { purple, yellow, amber, pink } from "@mui/material/colors";
import { IconButton, ThemeProvider } from "@mui/material";
import { usePostLikedMutation } from "./postsApiSlice";
import { selectPostById } from "./postsApiSlice";
import { createTheme } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthContext";
import styled from "styled-components";

const theme = createTheme({
  palette: {
    ambr: {
      main: amber[400],
      contrastText: "#fff",
    },
  },
});

const Layout = styled.div`
  display: flex;
`;

const LikeCount = styled.span`
  align-self: center;
  opacity: 0.5;
  font-size: 0.7rem;
`;
//
export const Likes = ({ postId }) => {
  const specificPost = useSelector((state) => selectPostById(state, postId));

  // console.log(specificPost);
  //

  const authContext = useContext(AuthContext);

  const [postLiked, {}] = usePostLikedMutation();

  let checker;
  if (specificPost) {
    checker = specificPost?.likes?.findIndex(
      (id) => id.id == `${postId}${authContext?.authUserData?.id}`
    );
  }

  const Clicked = async () => {
    if (postId) {
      try {
        await postLiked({
          id: `${postId}${authContext?.authUserData.id}`,
          postId: postId,
          userId: authContext?.authUserData.id,
        }).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <IconButton
          // color="ambr"
          style={{
            border: "none",
            outline: "none",
            width: "23px",
            height: "30px",
          }}
          onClick={Clicked}
        >
          <FavoriteIcon
            // color="ambr"
            sx={{
              color: checker == -1 ? "" : amber[400],
              width: "19px",
            }}
          />
        </IconButton>{" "}
        <LikeCount>{specificPost?.likes.length}</LikeCount>
      </Layout>
    </ThemeProvider>
  );
};
