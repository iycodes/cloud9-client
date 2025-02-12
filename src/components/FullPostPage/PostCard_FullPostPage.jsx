import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { SinglePostContext } from "./fullPostPage";
import { MoreOptions } from "../PostCard1/moreOptions";
import { Link } from "react-router-dom";
import { selectUserById } from "../../features/users/usersApiSlice";
import { useSelector } from "react-redux";
import { Likes } from "../../features/posts/Likes";
import { BroadcastPost } from "../../features/posts/broadcastPost";
import { QuotePost } from "../PostCard1/quotePost";
import { selectPostById } from "../../features/posts/postsApiSlice";
// import { CommentCount } from "../PostCard1/CommentCount";
import { TimeAgo } from "../PostCard1/TimeAgo";
import { ReplyComment } from "../comment/ReplyComment";
import ShortTextRoundedIcon from "@mui/icons-material/ShortTextRounded";

//
const Layout = styled.div`
  align-self: center;
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  flex-direction: column;
  width: 95%;
  padding: 10px 10px 0px 10px;
  margin-bottom: 10px;
`;
const Top = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  margin-bottom: 0px;
`;
const Top1 = styled.div`
  display: flex;
  width: 70%;
`;
const AuthorName = styled.div`
  font-weight: 600;
  opacity: 0.5;
`;
const Top2 = styled.div`
  justify-content: end;
  display: flex;
  width: 30%;
  align-items: center;
`;
const Middle = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
`;
const Avatar = styled.img`
  margin-top: 10%;
  border-radius: 100px;
  aspect-ratio: 1/1;
  height: 50px;
`;
const ContentBox = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 7px;

  height: auto;
  border: 0.3px solid rgba(106, 13, 173, 0.3);

  background-color: white;

  position: relative;
  margin-left: 20px;
  float: left;
  border-radius: 10px;
`;
const StyledDiv1 = styled.div`
  display: flex;
  align-self: flex-end;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;
const Interactions = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;

  align-items: flex-end;
  justify-content: flex-end;
`;
let bcPostId;
//
export const PostCard_FullPostPage = () => {
  let postDetails;
  //   const { postDetails } = useContext(SinglePostContext);
  const postContext = useContext(SinglePostContext);

  postDetails = postContext?.postDetails;

  let broadcastedPost;
  let user;
  broadcastedPost = useSelector((state) =>
    selectPostById(state, postDetails?.ogPostId)
  );

  user = useSelector((state) =>
    selectUserById(
      state,
      postDetails?.title != "BROADCAST"
        ? postDetails?.userId
        : broadcastedPost?.userId
    )
  );
  // console.log(user);

  let postRendered;
  if (postDetails?.title == "POST") {
    postRendered = (
      <Layout>
        <Top>
          <Top1>
            <AuthorName>{postDetails?.userName}</AuthorName>
          </Top1>
          <Top2>
            <TimeAgo timeStamp={postDetails?.createdAt} />
            <MoreOptions postId={postDetails?.id} />
          </Top2>
        </Top>
        <Middle>
          <Link to={`/user/${postDetails ? postDetails.userId : ""}`}>
            <Avatar src={user?.profileImageSrc} />
          </Link>
          <Wrapper>
            <ContentBox>{postDetails?.body}</ContentBox>
            <StyledDiv1>
              <ShortTextRoundedIcon
                color="disabled"
                sx={{
                  transform: "scale(0.8)",
                  cursor: "pointer",
                  // marginLeft: "-3px",
                }}
              />
              {postDetails.comments?.length > 0 && (
                <CommentCount>{postDetails?.comments?.length}</CommentCount>
              )}
              {/* <ReplyComment /> */}
            </StyledDiv1>
          </Wrapper>
          <Interactions>
            <BroadcastPost postId={postDetails?.id} bcPostId={bcPostId} />
            <Likes postId={postDetails?.id} />
          </Interactions>
        </Middle>
        <ReplyComment />
      </Layout>
    );
  }
  if (postDetails?.title == "BROADCAST") {
    postRendered = (
      <Layout>
        <Top>
          <Top1>
            <AuthorName>{broadcastedPost?.userName}</AuthorName>
          </Top1>
          <Top2>
            <MoreOptions postId={broadcastedPost?.id} />
          </Top2>
        </Top>
        <Middle>
          <Link to={`/user/${broadcastedPost ? broadcastedPost.userId : ""}`}>
            <Avatar src={user?.profileImageSrc} />
          </Link>
          <Wrapper>
            <ContentBox>{broadcastedPost?.body}</ContentBox>
            <StyledDiv1>
              <ShortTextRoundedIcon
                color="disabled"
                sx={{
                  transform: "scale(0.8)",
                  cursor: "pointer",
                  marginLeft: "-3px",
                }}
              />
              {broadcastedPost?.comments?.length > 0 && (
                <CommentCount>{broadcastedPost?.comments.length}</CommentCount>
              )}
              {/* <ReplyComment /> */}
            </StyledDiv1>
          </Wrapper>
          <Interactions>
            <BroadcastPost postId={broadcastedPost?.id} />
            <Likes postId={broadcastedPost?.id} />
          </Interactions>
        </Middle>
        <ReplyComment />
      </Layout>
    );
  }

  return (
    <>
      {/* {postDetails?.title != "DELETED" && postRendered} */}
      {postRendered}
    </>
  );
};
