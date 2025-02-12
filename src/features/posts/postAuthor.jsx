import React from "react";
import { selectById as selectUserById } from "../users/usersApiSlice";
import { selectById as selectPostById } from "./postsApiSlice";
import { useSelector } from "react-redux";

export const PostAuthor = ({ userId }) => {
  const postAuthor = useSelector((state) => selectUserById(state, userId));
  // const postList = useSelector((state) => {
  //   state.posts.posts;
  // });
  // const postAuthor = postList.find((post) => post.id === authorId);
  return <div>by {postAuthor.name}</div>;
};
