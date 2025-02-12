import React from "react";
import { IconButton } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import styled from "styled-components";
import {
  commentsAdapter,
  initialCommentsState,
  useBroadcastCommentMutation,
  useGetCommentsQuery,
} from "../../features/posts/commentsApiSlice";
import { purple, teal } from "@mui/material/colors";
import { AuthContext } from "../../Authentication/AuthContext";
import { useContext } from "react";
// import { selectCommentById } from "../FullPostPage/fullPostPage";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
//

const Layout = styled.div`
  display: flex;
`;
const BroadcastCount = styled.span`
  align-self: center;
  opacity: 0.5;
  font-size: 0.8rem;
`;
//
export const BroadcastComment = ({ commentId, postId }) => {
  const authContext = useContext(AuthContext);

  const authUserData = authContext?.authUserData;
  const [broadcastComment] = useBroadcastCommentMutation();
  console.log(postId);
  const selectCommentsData = createSelector(
    () => useGetCommentsQuery(postId),
    (res) => res.data
  );

  const { selectAll, selectById: selectCommentById } =
    commentsAdapter?.getSelectors(
      (state) => selectCommentsData(state) ?? initialCommentsState
    );
  const specificComment = useSelector((state) =>
    selectCommentById(state, commentId)
  );
console.log(specificComment)
  const checker = specificComment?.broadcasts.find(
    (broadcast) => broadcast?.userId == authUserData?.id
  );

  const handleBroadcast = () => {
    try {
      broadcastComment({
        id: `${commentId}${authUserData.id}`,
        postId: postId,
        ogPostId: commentId,
        userId: authUserData.id,
        displayName: authUserData.displayName,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  // stopped here - was about to check my commentsApi slice for error because my broadcastComment isnt working..
  //
  return (
    <Layout>
      <IconButton
        sx={{
          border: "none",
          outline: "none",
          width: "23px",
          height: "30px",
        }}
        onClick={handleBroadcast}
      >
        <RepeatIcon sx={{ color: checker ? purple[300] : "", width: "19px" }} />
      </IconButton>
      <BroadcastCount>{specificComment?.broadcasts?.length}</BroadcastCount>
    </Layout>
  );
};
