import React from "react";
import { IconButton } from "@mui/material";
import styled from "styled-components";
import ShortTextRoundedIcon from "@mui/icons-material/ShortTextRounded";
import { BiChat } from "react-icons/bi";
import ReplyModal_Comment from "../../modal/ReplyModal_Comment";
//

const Layout = styled.div``;

//
export const ReplyComment = () => {
  //
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Layout>
      {/* <IconButton
        onClick={handleOpen}
        sx={{
          width: "20px",
          height: "20px",
        }}
      >
        <BiChat
          style={{
            transform: "scale(4.5)",
            color: "purple",
          }}
        />
      </IconButton> */}

      <ReplyModal_Comment />
    </Layout>
  );
};
