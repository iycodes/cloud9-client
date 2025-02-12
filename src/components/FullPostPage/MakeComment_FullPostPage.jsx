import React, { useState } from "react";
import styled from "styled-components";
import { Button, TextareaAutosize } from "@mui/material";
import { useContext } from "react";
import { SinglePostContext } from "./fullPostPage";
import { useAddCommmentMutation } from "../../features/posts/commentsApiSlice";
import { useParams } from "react-router-dom";
import loadingSpinner from "../../assets/animations/icons8-iphone-spinner.gif";
import { ColorRing } from "react-loader-spinner";
import { AuthContext } from "../../Authentication/AuthContext";
//

const StyledForm = styled.form`
  display: flex;
  width: 90%;
  /* width: 100%; */
  /* align-self: center; */
  align-items: center;
`;
const StyledImg = styled.img`
  display: flex;
  height: 100%;
  aspect-ratio: 1/1;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-content: flex-end;
  justify-content: flex-end;
  height: 100%;
  width: 20%;
`;

//
export const MakeComment_FullPostPage = () => {
  const { postId } = useParams();
  const authContext = useContext(AuthContext);
  const authUserData = authContext?.authUserData;
  const postContext = useContext(SinglePostContext);
  const [addComment, { data, error, isLoading }] = useAddCommmentMutation();

  const [commentBody, setCommentBody] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment({
        body,
        postId,
        userId: authUserData?.id,
        displayName: authUserData.displayName,
      }).unwrap();
      setCommentBody("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextareaAutosize
        style={{
          outline: "none",
          border: "none",
          width: "80%",
          borderRadius: "5px",
          padding: "5px 2px 5px 2px ",
          alignSelf: "flex-start",
        }}
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
      />
      <ButtonDiv>
        {" "}
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          disabled={!commentBody}
          disableElevation
          sx={{
            textTransform: "none",
            height: "25px",
            width: "50px",
            padding: "0px 3px 0px 3px",
            // marginLeft: "20px",
            fontSize: "0.7rem",
            alignSelf: "flex-end",
          }}
        >
          {/* comment */}
          {isLoading ? <ColorRing height="100%" /> : "comment"}
        </Button>
      </ButtonDiv>
    </StyledForm>
  );
};
