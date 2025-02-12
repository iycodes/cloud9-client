import React, { useState } from "react";
import { useSelector } from "react-redux";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { purple } from "@mui/material/colors";
import { IconButton } from "@mui/material";
import { useGetCommentsQuery } from "./commentsApiSlice";
import { useParams } from "react-router-dom";
import { useCommentLikedMutation } from "./commentsApiSlice";
export const LikeComment = ({ commentId }) => {
  const { id: postId } = useParams();
  console.log(postId);
  const { data } = useGetCommentsQuery(postId);
  console.log(data);
  const specificComment = data.entities[commentId];
  console.log(specificComment);

  const [commentLiked, {}] = useCommentLikedMutation(postId);
  //

  //   const [postBuzzed, {}] = usePostBuzzedMutation();
  const [buzzed, setBuzzed] = useState(false);
  const userid = "6";

  let checker;
  checker = specificComment.buzzedBy.findIndex((id) => id.id == userid);

  const Clicked = () => {
    setBuzzed(!buzzed);

    if (commentId) {
      commentLiked({
        commentId: commentId,
        postId: postId,
        visitorId: userid,
      });
    }
  };
  return (
    <div>
      <IconButton
        style={{
          border: "none",
          outline: "none",
          width: "25px",
          height: "30px",
        }}
        onClick={Clicked}
      >
        {" "}
        <ElectricBoltIcon
          color="disabled"
          sx={{ color: checker == -1 ? "" : purple[400] }}
        />
      </IconButton>{" "}
      {specificComment.buzzCount} buzzes
    </div>
  );
};
