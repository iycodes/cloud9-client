import styles from "./HomePage.module.css";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import { Style } from "react-style-tag";
import { HeaderBar } from "../HeaderBar/HeaderBar";
import { PostCard } from "../PostCard1/PostCard";
import { TopTrendsCard } from "../TopTrendsCard/TopTrendsCard";
import {
  selectAllPosts,
  selectAllPostsId,
  useAddNewPostMutation,
} from "../../features/posts/postsApiSlice";
import { AuthContext } from "../../Authentication/AuthContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { CreatePost } from "../createPost/createPost";
import { createContext } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { amber, purple } from "@mui/material/colors";
import addIcon from "../../assets/lottie/addd.svg";
import { Button, TextareaAutosize } from "@mui/material";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
//
export const EachPostContext = createContext();
//
export const Homepage = () => {
  const allPostIds = useSelector(selectAllPostsId);
  const authContext = useContext(AuthContext);
  const authUserData = authContext?.authUserData;
  // const textAreaRef = useRef()
  const newPostModalRef = useRef();
  const [addNewPost, { isSuccess, isError }] = useAddNewPostMutation();
  const [showModal, setShowModal] = useState(false);
  // const user = useSelector((state) => selectUserById(state, authUserData?.id));
  const [postData, setPostData] = useState("");

  useEffect(() => {
    if (isSuccess) {
      toast.success("post created", { id: "toast-id" });
      // textAreaRef.current.value =" ";
      setPostData("");
      setShowModal(false);
    }
    if (isError) {
      toast.error("post created", { id: "toast-id" });
    }
    return () => {};
  }, [isSuccess, isError]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (postData.trim() == "") {
      toast.error("You cannot make an empty post", { id: "toast-id" });
      return;
    }
    try {
      toast.loading("creating your new post", {
        id: "toast-id",
        promise: true,
      });
      addNewPost({
        title: "POST",
        body: postData,
        userId: authUserData?.id,
      }).unwrap();
    } catch (error) {
      console.log("error creating post", error);
      toast.error("error creating post", { id: "toast-id" });
    }
  };
  const userId = authContext?.authUserData?.id;

  const allPosts = allPostIds?.map((id) => (
    <EachPostContext.Provider key={id} value={{ postId: id }}>
      <PostCard key={id} />
    </EachPostContext.Provider>
  ));

  return (
    <>
      <Toaster />
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.header}>
            <HeaderBar setShowModal={setShowModal} />
          </div>
          <div className={styles.main}>
            <div className={styles.leftsidebar}>
              <ProfileCard userIdProp={userId} />{" "}
            </div>
            <div className={styles.centre}>
              <CreatePost />
              {allPosts}
            </div>
            <div
              onClick={() => setShowModal(true)}
              className={styles.floatingButton}
            >
              <img src={addIcon} alt="" />
            </div>
          </div>
        </div>
        <div
          onClick={() => setShowModal(false)}
          // style={{ display: "none" }}
          className={`${styles.newPostModal} ${
            !showModal ? styles.newPostModalHide : ""
          }
        `}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles.inputArea}
          >
            <TextareaAutosize
              id="textarea"
              // ref={textAreaRef}
              minRows={3}
              name="textarea"
              type="text"
              value={postData}
              onChange={(e) => {
                setPostData(e.target.value);
                console.log(postData);
              }}
              placeholder="What's on your mind?"
            />
            <div className={styles.postBtn}>
              <Button type="submit" onClick={submitHandler} color="secondary">
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
