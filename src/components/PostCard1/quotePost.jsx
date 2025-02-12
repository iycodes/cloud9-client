import { IconButton } from "@mui/material";
import React from "react";
import NearMeIcon from "@mui/icons-material/NearMe";
import { useState } from "react";
import ReplyModal from "../../modal/ReplyModal";
import ReplyIcon from "@mui/icons-material/Reply";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import styled from "styled-components";
//
//
const Layout = styled.div`
margin-right: 5px;

  
`
export const QuotePost = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
    <Layout>
    <IconButton
    sx={{
      width:"20px",
      height:"20px"
    }}
    onClick={handleOpen} color="secondary">
        <FormatQuoteIcon />
      </IconButton>
      <ReplyModal handleCloseProps={handleClose} openProps={open} />
    </Layout>
    </>
  );
};
