import React from "react";
import styled from "styled-components";
import styles from "./fullpostpage.module.css";
import { useParams } from "react-router-dom";
import { Style } from "react-style-tag";
import { useGetPostByIdQuery } from "../../features/posts/postsApiSlice";
import { useSelector } from "react-redux";
import { StickyBar } from "../UserPage/UserPage";
import { IconButton } from "@mui/material";
import KeyboardReturn from "@mui/icons-material/KeyboardReturn";
import { useNavigate } from "react-router-dom";
import { PostCard_FullPostPage } from "./PostCard_FullPostPage";
import { CommentSection } from "../comment/CommentSection";
import { createContext } from "react";
import { TopTrendsCard } from "../TopTrendsCard/TopTrendsCard";
import { useMemo } from "react";
import { FollowButton } from "../FollowButton";
import {
  commentsApiSlice,
  useGetCommentsQuery,
} from "../../features/posts/commentsApiSlice";
import { commentsAdapter } from "../../features/posts/commentsApiSlice";
import { createSelector } from "@reduxjs/toolkit";
import { initialCommentsState } from "../../features/posts/commentsApiSlice";
import { MakeComment_FullPostPage } from "./MakeComment_FullPostPage";
import { ArrowBackIos } from "@mui/icons-material";
import { ArrowBack } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { FullPostPage_ProfileCard } from "./ProfileCard/FullPostPage_ProfileCard";

const Layout = styled.div`
  display: grid;
  width: 95vw;
  max-width: 1000px;
  grid-template-columns: 1.5fr 3.5fr 1fr;
  grid-template-rows: auto;
  height: 100vh;
  max-height: 100vh;
  gap: 10px;
`;
const LeftSideBar = styled.div`
  width: 100%;

  min-height: 300px;
  grid-column: 1/2;
  grid-row: 1/2;
`;

const Main = styled.div`
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: 2/3;
  grid-row: 1/2;
  //Hide scrollbar for IE, Edge and Firefox
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RightSideBar = styled.div`
  width: 100%;
  height: 450px;
  grid-column: 3/4;
  grid-row: 1/2;
`;

const SpacingDiv = styled.div`
  width: 80%;
`;

const FixedDiv = styled.div`
  z-index: +1;
  background-color: #f2f5fa;
  display: flex;
  min-width: 100%;
  width: 100%;
  bottom: 0px;
  position: sticky;
  padding-top: 10px;
  padding-bottom: 10px;

  justify-content: center;
  /* box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px; */
  box-shadow: rgba(50, 50, 93, 0.25) 0px -5px 10px -5px;

  /* align-items: center; */
`;
export let selectCommentById;

export const SinglePostContext = createContext();
export const FullPostPage = () => {
  const { postId } = useParams();
  // const allComms = useGetCommentsQuery(postId);

  const selectCommentsData = createSelector(
    () => useGetCommentsQuery(postId),
    (res) => res.data
  );

  const { selectAll, selectById } = commentsAdapter?.getSelectors(
    (state) => selectCommentsData(state) ?? initialCommentsState
  );
  selectCommentById = selectById;
  const allComments = useSelector(selectAll);
  //

  //
  const entities = allComments?.entities;
  // const postDetails = useSelector((state) => selectPostById(state, postId));
  const { data: postDetails, error } = useGetPostByIdQuery(postId);

  const navigate = useNavigate();

  //
  const groupCommentsByParentId = useMemo(() => {
    const parentIds = {}; // where each parentId will be a key in
    // the object for an array containing its comments
    // so for every comment with a parentId we will push the comment into
    // the array with the said parentId as its key, and if the array with the
    // said parentId doesnt exist we will create a new one as the
    // code below shows..
    allComments?.forEach(
      (comment) => {
        //  if (parentIds[comment.parentId]) {
        //      parentIds[comment.parentId].push(comment)
        //  }else {
        //   parentIds[comment.parentId] = []
        //   parentIds[comment.parentId].push(comment)

        //  } a better, shorter way of writing this is shown below

        parentIds[comment.parentId] ||= [];
        parentIds[comment.parentId].push(comment);
      },
      [allComments]
    );

    return parentIds; // returns the parentIds object as the value of our function
  });

  // trying mine out
  // for (const id in entities) {
  //   console.log(id);
  // }
  //
  const getReplies = (parentId) => groupCommentsByParentId[parentId];
  const rootComments = getReplies(null);
  // console.log(allComments);
  //

  return (
    <>
      <SinglePostContext.Provider
        value={{
          postDetails,
          allComments,
          rootComments,
          getReplies,
        }}
      >
        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.leftsidebar}>
              {<FullPostPage_ProfileCard userIdProp={postDetails?.userId} />}
            </div>
            <div className={styles.main}>
              <StickyBar>
                <IconButton onClick={() => navigate(-1)}>
                  <ArrowBack color="secondary" />
                </IconButton>
                <SpacingDiv />
                <FollowButton userToFollowId={postDetails?.userId} />
              </StickyBar>
              <PostCard_FullPostPage postIdProp={postId} />
              <CommentSection />
            </div>
          </div>
        </div>
      </SinglePostContext.Provider>
    </>
  );
};
