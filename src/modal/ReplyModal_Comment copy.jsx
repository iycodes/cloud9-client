import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import styles from "./ReplyModal.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { selectUserById } from "../features/users/usersApiSlice";
import { useSelector } from "react-redux";
import { TextareaAutosize } from "@mui/material";
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
//

//
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  outline: none;
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: auto;
  border-radius: 7px;
  padding: 15px;
  background-color: white;
`;
const Top = styled.div`
  display: flex;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 60px;
`;

const StyledImg = styled.img`
  aspect-ratio: 1/1;
  width: 46px;
  max-height: 46px;
  border-radius: 100%;
  margin-right: 10px;
`;

const ReplyButton = styled.button`
  width: 50px;

  font-size: 0.7em;
  text-align: center;
  display: flex;
  color: white;
  background-color: rgba(106, 13, 173, 0.8);
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 5px;
  height: 25px;
  align-items: center;
  justify-content: center;
  &:disabled {
    /* background-color: grey; */
    background-color: darkgray;
  }
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
//
export default function ReplyModal_Comment({ openProps, setOpenProps }) {
  const { postId } = useParams();
  const commentContext = useContext(SingleCommentContext);
  const comment = commentContext?.eachComment;
  const authContext = useContext(AuthContext);
  const authUserData = authContext?.authUserData;
  const userId = authUserData?.id;
  const user = useSelector((state) => selectUserById(state, userId));
  const [replyBody, setReplyBody] = React.useState("");
  const [addComment, { data, isLoading, error }] = useAddCommmentMutation();
  const handleClose = () => setOpenProps(false);
  console.log(comment);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment({
        userId,
        parentId: comment.id,
        postId,
        displayName: authUserData.displayName,
        body: replyBody,
      }).unwrap();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  //
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openProps}
        onClose={handleClose}
        closeAfterTransition
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
      >
        {/* <Fade in={openProps}> */}

        <Box sx={style}>
          <StyledForm onSubmit={handleSubmit}>
            <Top>
              <StyledImg src={user?.profileImageSrc} />

              <TextareaAutosize
                autoFocus
                placeholder="give am hot hot"
                style={{
                  width: "90%",
                  minHeight: "20px",
                  border: "none",
                  outline: "none",
                  alignSelf: "center",
                  justifySelf: "center",
                }}
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
              />
            </Top>
            <Bottom>
              <QuotedCommentCard />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton>
                  <AddPhotoAlternateOutlinedIcon color="primary" />
                </IconButton>
                <IconButton>
                  <GifBoxOutlinedIcon />
                </IconButton>
                <ReplyButton disabled={!replyBody}>
                  {isLoading ? <ColorRing height="25px" /> : "Reply"}
                </ReplyButton>
              </div>
            </Bottom>
          </StyledForm>
        </Box>
        {/* </Fade> */}
      </Modal>
    </div>
  );
}
