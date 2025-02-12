import React from "react";
import { CommentCard } from "./CommentCard";
import styled from "styled-components";
import { SinglePostContext } from "../FullPostPage/fullPostPage";
import { useContext } from "react";
import { useState } from "react";
import { MakeComment_FullPostPage as MakeComment } from "../FullPostPage/MakeComment_FullPostPage";
//
const Layout = styled.div`
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 7px;
  width: 95%;
`;

//
export const CommentSection = () => {
  //
  let allComments;
  let rootComments;

  const postContext = useContext(SinglePostContext);

  allComments = postContext?.allComments;
  rootComments = postContext?.rootComments;

  const rootCommentsList = rootComments?.map((comment) => (
    <CommentCard key={comment.id} eachComment={comment} />
  ));

  return (
    <Layout>
      {/* {comments} */}
      {rootCommentsList}
    </Layout>
  );
};
