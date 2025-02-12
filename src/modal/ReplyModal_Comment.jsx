import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import styles from "./ReplyModal_Comment.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { selectUserById } from "../features/users/usersApiSlice";
import { useSelector } from "react-redux";
import { Button, TextareaAutosize } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { IconButton } from "@mui/material";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import styled from "styled-components";
import { QuotedCommentCard } from "../components/comment/QuotedCommentCard";
import { ColorRing } from "react-loader-spinner";
import { useAddCommmentMutation } from "../features/posts/commentsApiSlice";
import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { useParams } from "react-router-dom";
import { SingleCommentContext } from "../components/comment/CommentCard";
import { useState } from "react";
import { QuotedPost_PostCard } from "../components/PostCard1/quotedPost_PostCard";
import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";

export default function ReplyModal_Comment() {
  const { postId } = useParams();
  const commentContext = useContext(SingleCommentContext);
  const comment = commentContext?.eachComment;
  const authContext = useContext(AuthContext);
  const authUserData = authContext?.authUserData;
  const userId = authUserData?.id;
  const user = useSelector((state) => selectUserById(state, userId));
  // const [replyBody, setReplyBody] = React.useState("");

  const [addComment, { data, isLoading, error, isError, isSuccess }] =
    useAddCommmentMutation();
  // const handleClose = () => setOpenProps(false);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  console.log(comment);
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("sending...", { id: "toast-id" });
    try {
      await addComment({
        userId,
        parentId: comment?.id,
        postId,
        displayName: authUserData.displayName,
        body: newComment,
      }).unwrap();
    } catch (error) {
      toast.error("error adding comment", { id: "toast-id" });
      console.log("error adding comment", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Reply added", { id: "toast-id" });
      // textAreaRef.current.value =" ";
      setNewComment("");
      setShowModal(false);
    }
    if (isError) {
      toast.success("error adding comment", { id: "toast-id" });
      console.log("error adding comment", error);
    }
    return () => {};
  }, [isSuccess, isError]);

  //
  return (
    <div
      className={styles.layout}
      //   onClick={() => setShowModal(false)}
      //   // style={{ display: "none" }}
      //   className={`${styles.newPostModal} ${
      //     !showModal ? styles.newPostModalHide : ""
      //   }
      //  `}\
    >
      <Toaster />
      <div className={styles.inputArea}>
        <TextareaAutosize
          id="textarea"
          // ref={textAreaRef}
          minRows={1}
          name="textarea"
          type="text"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
            console.log(newComment);
          }}
          placeholder="Make a comment"
        />
        <div className={styles.postBtn}>
          <Button type="submit" onClick={handleSubmit} color="secondary">
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
}
