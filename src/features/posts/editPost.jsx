import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsApiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useEditPostMutation } from "./postsApiSlice";
import { selectPostById } from "./postsApiSlice";
export const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPostId = location.state.PostId;
  console.log(selectedPostId);
  const [editPost, { isLoading }] = useEditPostMutation();
  const [body, setBody] = useState();
  const thePost = useSelector((state) => selectPostById(state, selectedPostId));
  console.log(thePost);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            editPost({
              id: selectedPostId,
              content: body,
            }).unwrap();
            navigate("../");
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        <textarea
          rows="7"
          cols="40"
          defaultValue={thePost.body}
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <button type="submit" disabled={!(body && !isLoading)}>
          Update
        </button>
      </form>
    </>
  );
};
