import React from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import { useSelector } from "react-redux";
import { selectPostById, selectAllPosts } from "./postsApiSlice";
import { purple, teal } from "@mui/material/colors";
import { usePostBroadcastedMutation } from "./postsApiSlice";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthContext";
//
const Layout = styled.div`
  display: flex;
`;
const BroadcastCount = styled.span`
  align-self: center;
  opacity: 0.5;
  font-size: 0.8rem;
`;
//
export const BroadcastPost = ({ postId }) => {
  //
  // console.log(ogPostId);
  // console.log(postId);
  const authContext = useContext(AuthContext);
  const authUserData = authContext?.authUserData;
  const specificPost = useSelector((state) => selectPostById(state, postId));

  let checker;
  if (specificPost) {
    checker = specificPost?.broadcasts?.findIndex(
      (id) => id.id == `${authUserData?.id}${postId}`
    );
  }

  //
  const [postBroadcasted] = usePostBroadcastedMutation();

  const handleBroadcast = async (e) => {
    // e.preventDefault();
    try {
      await postBroadcasted({
        id: `${authUserData?.id}${postId}`,
        title: "BROADCAST",
        // postId: postId,
        userId: authUserData?.id,
        ogPostId: postId,
        displayName: authUserData.displayName,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  //
  return (
    <>
      <Layout>
        <IconButton
          sx={{
            border: "none",
            outline: "none",
            width: "23px",
            height: "30px",
          }}
          onClick={handleBroadcast}
        >
          <RepeatIcon
            sx={{ color: checker == -1 ? "" : purple[300], width: "19px" }}
          />
        </IconButton>
        <BroadcastCount>{specificPost?.broadcasts?.length}</BroadcastCount>
      </Layout>
    </>
  );
};
