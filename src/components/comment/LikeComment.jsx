import React from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { amber } from "@mui/material/colors";
import { IconButton, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useContext } from "react";
import { SinglePostContext } from "../FullPostPage/fullPostPage";
import {
  useGetCommentByIdQuery,
  useLikeCommentMutation,
} from "../../features/posts/commentsApiSlice";
import { selectCommentById } from "../FullPostPage/fullPostPage";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AuthContext } from "../../Authentication/AuthContext";
import { useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import FavoriteIcon from "@mui/icons-material/Favorite";

//
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
  display: flex;
  font-size: 0.8em;
  align-self: center;
  opacity: 0.5;
`;
//
export const LikeComment = ({ commentId }) => {
  const { postId } = useParams();
  const [likeComment] = useLikeCommentMutation();
  const authContext = useContext(AuthContext);
  const authUserData = authContext?.authUserData;

  // if (typeof selectCommentById === "function") {
  // }
  const specificComment = useSelector((state) =>
    selectCommentById(state, commentId)
  );
  const checker = specificComment?.likes?.find(
    (like) => like.userId == authUserData.id
  );
  const theComment = useGetCommentByIdQuery(commentId)?.data;

  // const checker2 = theComment.likes.find;

  const handleLike = async () => {
    try {
      await likeComment({
        id: `${authUserData.id}${commentId}`,
        userId: authUserData.id,
        commentId: commentId,
        postId: postId,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <IconButton
          sx={{
            border: "none",
            outline: "none",
            width: "23px",
            height: "30px",
          }}
          onClick={handleLike}
        >
          <FavoriteIcon
            sx={{ color: checker ? amber[400] : "", transform: "scale(0.8)" }}
          />
        </IconButton>
        <LikeCount>{specificComment?.likes.length}</LikeCount>
      </Layout>
    </ThemeProvider>
  );
};
