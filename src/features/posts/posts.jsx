import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  selectPostById,
  selectAllPostsId,
} from "./postsApiSlice";
import { CreateNewPost } from "./createNewPost";
import { PostCard } from "./postCard";
import { useGetPostsQuery } from "./postSpostsApiSliceice";

import { OutpostsApiSliceet } from "react-router-dom";

//
//

export const Posts = () => {
  //
  //
  const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery();
  //

  if (error) {
    console.log(error);
  }
  //

  //

  // const orderedPostList = useSelector(selectAllPosts);
  const postsIdList = useSelector(selectAllPostsId);
  // console.log(orderedPostList);

  const latestPosts = postsIdList.map((postId) => (
    <PostCard key={postId} postId={postId} />
  ));

  let AllPosts;
  if (isLoading) {
    AllPosts = <div> ...Loading.. </div>;
  } else if (isSuccess) {
    AllPosts = <div> {latestPosts} </div>;
  } else if (isError) {
    AllPosts = <div> error :{error} </div>;
  }
  //

  //
  return (
    <>
      <CreateNewPost />
      <PostCard />
      <h2>latest posts</h2>
      {AllPosts}
      <Outlet />
    </>
  );
};
