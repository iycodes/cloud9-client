import React from "react";
import styled from "styled-components";
import { TimeAgo } from "../PostCard1/TimeAgo";
import { useContext } from "react";

import ShortTextRoundedIcon from "@mui/icons-material/ShortTextRounded";
import { SingleCommentContext } from "./CommentCard";

//

const Layout = styled.div`
  display: flex;
  margin-bottom: 5px;
  flex-direction: column;
  border-radius: 7px;
  width: auto;
  padding: 5px 10px 0 5px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
const ContentBox = styled.div`
  display: flex;
  padding: 7px;
  font-size: 0.8rem;
  height: 100%;
  border: 0.1px solid rgba(106, 13, 173, 0.3);

  background-color: white;

  position: relative;
  /* margin-left: 20px; */
  float: left;
  border-radius: 7px;
  &::after {
    content: " ";
    position: absolute;

    right: -10px;

    top: 8px;
    border-top: 10px solid transparent;

    border-right: 10px solid rgba(106, 13, 173, 0.15);
    border-left: none;
    border-bottom: 10px solid transparent;
    transform: rotate(180deg);
  }
  /* transform: rotate(180deg); */
`;
const ContentAndAvatar = styled.div`
  display: flex;
`;

const StyledDiv1 = styled.div`
  display: flex;
`;
const StyledImg = styled.img`
  aspect-ratio: 1/1;

  border-radius: 100px;
  height: 40px;
  margin-left: 12px;
`;

const StyledSpan = styled.span`
  font-size: 0.7rem;
  opacity: 0.3;
  font-style: italic;
  margin-bottom: 3px;
`;
const StyledDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;

const StyledSpan1 = styled.span`
  font-size: 0.7rem;
  opacity: 0.5;
  align-self: center;
  margin-left: -4.5px;
`;

//
export const QuotedCommentCard = () => {
  /* console.log(comment) */

  const commentContext = useContext(SingleCommentContext);
  const comment = commentContext?.eachComment;
  const user = commentContext?.user;

  //
  return (
    <Layout>
      <StyledSpan>
        {/* {dateFormatter.format(Date.parse(eachComment?.createdAt))} */}
        <TimeAgo timeStamp={comment?.createdAt} />
      </StyledSpan>
      <ContentAndAvatar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <ContentBox>{comment?.body}</ContentBox>
          <StyledDiv1>
            <ShortTextRoundedIcon
              color="disabled"
              sx={{
                transform: "scale(0.8)",
                marginLeft: "-3px",
              }}
            />
            <StyledSpan1>8</StyledSpan1>
          </StyledDiv1>
        </div>
        <StyledDiv2>
          <StyledImg src={user?.profileImageSrc} />
        </StyledDiv2>
      </ContentAndAvatar>
    </Layout>
  );
};
