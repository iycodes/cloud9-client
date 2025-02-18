import React from "react";
import styles from "./createPost.module.css";
import { selectUserById } from "../../features/users/usersApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useAddNewPostMutation } from "../../features/posts/postsApiSlice";
import { Button, IconButton, TextareaAutosize } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import PollRoundedIcon from "@mui/icons-material/PollRounded";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import { nanoid } from "@reduxjs/toolkit";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthContext";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRef } from "react";

//
export const CreatePost = () => {
  const authContext = useContext(AuthContext);
  const authUserData = authContext?.authUserData;
  // const textAreaRef = useRef()
  const [addNewPost, { isSuccess, isError }] = useAddNewPostMutation();
  const user = useSelector((state) => selectUserById(state, authUserData?.id));
  const [postData, setPostData] = useState("");

  useEffect(() => {
    if (isSuccess) {
      toast.success("post created", { id: "toast-id" });
      // textAreaRef.current.value =" ";
      setPostData("");
    }
    if (isError) {
      toast.success("post created", { id: "toast-id" });
    }
    return () => {};
  }, [isSuccess, isError]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (postData.trim() == "") {
      toast.error("You cannot make an empty post", { id: "toast-id" });
      return;
    }
    try {
      toast.loading("creating your new post", {
        id: "toast-id",
        promise: true,
      });
      addNewPost({
        title: "POST",
        body: postData,
        userId: authUserData?.id,
      }).unwrap();
    } catch (error) {
      console.log("error creating post", error);
      toast.error("error creating post", { id: "toast-id" });
    }
  };
  return (
    <div className={styles.layout}>
      <Toaster
        style={{ padding: "20px" }}
        className={styles.toast}
        richColors
      />
      <form className={styles.right} onSubmit={submitHandler}>
        <TextareaAutosize
          id="textarea"
          // ref={textAreaRef}
          minRows={2}
          name="textarea"
          type="text"
          value={postData}
          onChange={(e) => {
            setPostData(e.target.value);
            console.log(postData);
          }}
          placeholder="What's on your mind?"
        />
        <div className={styles.inputActions}>
          {/* <div className={styles.otherBtns}>
            <input type={"file"} multiple="multiple" id="postMedia" />
            <IconButton
              color="secondary"
              sx={{
                padding: "2px",
              }}
            >
              <label className={styles.mediaa} htmlFor="postMedia">
                <AddPhotoAlternateOutlinedIcon color="secondary" />
              </label>
            </IconButton>
          </div> */}
          <div className={styles.postBtn}>
            <Button type="submit" color="secondary">
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
