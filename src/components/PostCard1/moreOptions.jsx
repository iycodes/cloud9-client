import React from "react";
import { IconButton, Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { useDeletePostMutation } from "../../features/posts/postsApiSlice";
import { useSelector } from "react-redux";
import { selectPostById } from "../../features/posts/postsApiSlice";
import PendingIcon from "@mui/icons-material/Pending";
import styled from "styled-components";

//
const Layout = styled.div``;
//
export const MoreOptions = ({ postId }) => {
  const specificPost = useSelector((state) => selectPostById(state, postId));
  const [deletePost] = useDeletePostMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const showMenuOptions = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const hideMenuOptions = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (e) => {
    // e.preventDefault();
    setAnchorEl(null);
    try {
      await deletePost(postId).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  const menuId = "menuList";
  return (
    <Layout>
      <div
        style={{
          color: "#BA68C8",
          cursor: "pointer",
          transform: "scale(1)",
          fontWeight: "700",
          textAlign: "",
        }}
        id={menuId}
        role="button"
        onClick={showMenuOptions}
      >
        <PendingIcon />
      </div>
      <Menu
        disableAutoFocusItem
        id={menuId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={hideMenuOptions}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem sx={{ fontSize: "medium" }} onClick={handleDelete}>
          Delete
        </MenuItem>
        <MenuItem sx={{ fontSize: "medium" }}>not interested</MenuItem>
        <MenuItem sx={{ fontSize: "medium" }}>Bookmark</MenuItem>
      </Menu>
    </Layout>
  );
};
