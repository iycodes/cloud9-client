import React from "react";
import { IconButton } from "@mui/material";
import { lightBlue, teal } from "@mui/material/colors";
import styled from "styled-components";
import Slide from "@mui/material/Slide";
import ShortTextRoundedIcon from "@mui/icons-material/ShortTextRounded";
import { useGetChildCommentCountQuery } from "../../features/posts/commentsApiSlice";
import { useGetCommentCountQuery } from "../../features/posts/postsApiSlice";
import { Comment } from "@mui/icons-material";
//

//
const Layout = styled.div`
  align-self: flex-end;
  display: flex;
`;
const StyledSpan = styled.span`
  font-size: 0.7rem;
  opacity: 0.5;
  align-self: center;
`;
export const CommentCount = ({ handleSlideProps, postId }) => {
  const commentCount = useGetCommentCountQuery(postId)?.data;
  const childCommentCount = useGetChildCommentCountQuery(postId)?.data;
  //
  //

  return (
    <>
      <Layout>
        <IconButton
          onClick={handleSlideProps}
          sx={{
            width: "25px",
            height: "25px",
          }}
        >
          <Comment
            sx={{
              width: "20px",
              height: "20px",
            }}
            color="disabled"
          />
        </IconButton>
        <StyledSpan>
          {commentCount > 0 && commentCount}
          {childCommentCount > 0 && childCommentCount}
        </StyledSpan>
      </Layout>
    </>
  );
};
