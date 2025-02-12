import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsApiSlice";
import { selectUserById } from "../users/usersApiSlice";
import { useDeletePostMutation } from "./postsApiSlice";
import { Buzzes } from "./buzzes";
import { TimeAgo } from "./timeAgo";
import { Link } from "react-router-dom";

//
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

//Delete button transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const PostInView = () => {
  const { id } = useParams();
  //   const userid = "8";

  //Delete post request
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const specificPost = useSelector((state) => selectPostById(state, id));
  const specificUser = useSelector((state) =>
    selectUserById(state, specificPost?.userId)
  );
  console.log(specificPost);

  // delete dialog..
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (e) => {
    e.preventDefault();
    try {
      await deletePost({
        id: id,
        userId: specificPost.userId,
        title: "deleted",
        body: "This post has been deleted",
        timeStamp: specificPost.timeStamp,
        dateDeleted: new Date().toISOString(),
      }).unwrap();
      setOpen(false);
    } catch (error) {
      console.log(error.message);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {specificPost && (
        <div style={{ border: "2px solid black", marginBottom: "10px" }}>
          <p>{specificPost?.title}</p>
          <div>{specificPost?.body}</div>
          <div>
            by
            {specificUser?.name}
          </div>
          {specificPost?.timeStamp}
          {typeof specificPost?.buzzCount == "number" && (
            <Buzzes postId={specificPost.id} />
          )}
          {typeof specificPost?.buzzCount == "number" && (
            <Link
              to="./edit"
              state={{
                PostId: id,
              }}
            >
              Edit
            </Link>
          )}
        </div>
      )}
      {specificPost?.title != "deleted" && (
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Delete Post
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            // aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              {"Are you sure you want to delete this post?"}
            </DialogTitle>
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-slide-description">
              Delete Post
            </DialogContentText> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} disabled={isLoading}>
                Delete
              </Button>
              <Button onClick={handleCancel}>cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};
