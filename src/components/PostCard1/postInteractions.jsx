// import { MakeComment } from "./CommentCount";
import React from "react";
import { Likes } from "../../features/posts/Likes";
import { BroadcastPost } from "../../features/posts/broadcastPost";
import Slide from "@mui/material/Slide";
import { TextareaAutosize } from "@mui/material";
import { selectUserById } from "../../features/users/usersApiSlice";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import QuickreplyIcon from "@mui/icons-material/Quickreply";
import styled from "styled-components";
//

//

const StyledImg = styled.img`
  aspect-ratio: 1/1;
  width: 30px;
  max-height: 30px;
  border-radius: 100%;
  margin-right: 5px;
`;
const StyledDiv1 = styled.div`
  display: flex;
  width: 100;
  max-height: 35;
  align-self: flex-end;
`;

const StyledDiv3 = styled.div`
  display: flex;
  flex-direction: column;
`;
//
export const PostInteractions = ({ postId, bcPostId, styleProps }) => {
  //   const { postId } = useContext(EachPostContext);
  const userId = "1";
  const user = useSelector((state) => selectUserById(state, userId));

  const [show, setShow] = React.useState(false);
  const containerRef = React.useRef(null);

  const handleSlide = () => {
    setShow(!show);
  };

  const StyledDiv = styled.div`
    display: ${show ? "flex" : "none"};
    margin-top: 5px;
    width: 100%;
    margin-left: 50px;
  `;

  //

  //
  const icon = (
    <StyledDiv>
      <StyledImg src={user?.profileImageSrc} />
      <TextareaAutosize
        placeholder="talk your mind"
        style={{
          border: "none",
          outline: "none",
          minWidth: "150px",
          width: "60%",
          alignSelf: "center",
        }}
      />
      <StyledDiv1>
        <IconButton>
          <AddPhotoAlternateOutlinedIcon color="primary" />
        </IconButton>
        <IconButton>
          <GifBoxOutlinedIcon />
        </IconButton>

        <IconButton color="primary">
          <QuickreplyIcon />
        </IconButton>
      </StyledDiv1>
    </StyledDiv>
  );

  return (
    <StyledDiv3 ref={containerRef}>
      <Slide direction="down" in={show} container={containerRef.current}>
        {icon}
      </Slide>
      <div className={styleProps}>
        <MakeComment handleSlideProps={handleSlide} />
        <BroadcastPost postId={postId} bcPostId={bcPostId} />
        <Likes postId={postId} />
      </div>
    </StyledDiv3>
  );
};
