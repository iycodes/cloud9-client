import React from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { amber } from "@mui/material/colors";
import { IconButton, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useContext } from "react";
import {
  useGetCommentByIdQuery,
  useLikeCommentMutation,
  useLike_BC_COMMENTMutation,
} from "../../features/posts/commentsApiSlice";

import { useSelector } from "react-redux";
import styled from "styled-components";
import { AuthContext } from "../../Authentication/AuthContext";
import { useParams } from "react-router-dom";
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
export const LikeComment_BC_COMMENT = ({ commentId }) => {
  const { postId } = useParams();
  //   const [likeComment] = useLikeCommentMutation();
  const [like_BC_COMMENT] = useLike_BC_COMMENTMutation();
  const authContext = useContext(AuthContext);
  const authUserData = authContext?.authUserData;

  const theComment = useGetCommentByIdQuery(commentId)?.data;
  console.log(theComment);

  const checker = theComment?.likes?.find(
    (like) => like?.userId == authUserData?.id
  );

  const handleLike = async () => {
    try {
      await like_BC_COMMENT({
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
        <LikeCount>{theComment?.likes?.length}</LikeCount>
      </Layout>
    </ThemeProvider>
  );
};
