import * as React from "react";
import styles from "./ReplyModal.module.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { selectUserById } from "../features/users/usersApiSlice";
import { useSelector } from "react-redux";
import { TextareaAutosize } from "@mui/material";
import { QuotedPost_PostCard } from "../components/PostCard1/quotedPost_PostCard";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { IconButton } from "@mui/material";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import styled from "styled-components";
//

//

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

const ReplyButton = styled.div`
  cursor: pointer;
  font-size: smaller;
  text-align: center;
  padding: 4px 10px;
  background-color: white;
  color: rgba(106, 13, 173, 0.8);
  font-weight: 650;
  border: 2px solid transparent;
  border-radius: 5px;
  /* height: 30px; */
  height: auto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
//
export default function ReplyModal({ handleCloseProps, openProps }) {
  // const { postId } = useContext(EachPostContext);
  const userId = "3";
  const user = useSelector((state) => selectUserById(state, userId));

  return (
    // <div className={styles.modalBackground} >
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openProps}
      onClose={handleCloseProps}
      closeAfterTransition
      // BackdropComponent={Backdrop}
      // BackdropProps={{
      //   timeout: 500,
      // }}
    >
      <div onClick={handleCloseProps} className={styles.modalBackground}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <Top>
            <StyledImg src={user?.profileImageSrc} />

            <TextareaAutosize
              className={styles.textarea}
              placeholder="add text here"
            />
          </Top>
          <Bottom>
            <QuotedPost_PostCard />
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <ReplyButton>Quote</ReplyButton>
            </div>
          </Bottom>
        </div>
        {/* </Fade> */}
      </div>
    </Modal>
    // </div>
  );
}
