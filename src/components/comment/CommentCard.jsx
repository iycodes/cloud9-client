import React from "react";
import styles from "./CommentCard.module.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUserById } from "../../features/users/usersApiSlice";
import { TimeAgo } from "../PostCard1/TimeAgo";
import { LikeComment } from "./LikeComment";
import { ReplyComment } from "./ReplyComment";
import { SinglePostContext } from "../FullPostPage/fullPostPage";
import { useContext } from "react";
import { ChildrenCommentsList } from "./ChildrenCommentsList";
import { useState } from "react";
import ShortTextRoundedIcon from "@mui/icons-material/ShortTextRounded";
import { BroadcastComment } from "./BroadcastComment";
import { Message } from "@mui/icons-material";
import { Chat } from "@mui/icons-material";
import { ChatBubble } from "@mui/icons-material";
import { ArrowDownward } from "@mui/icons-material";
import { ArrowDropDown } from "@mui/icons-material";
//
const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;
const Layout1 = styled.div`
  display: flex;
  margin-bottom: 5px;
  flex-direction: column;
  border-radius: 7px;
  width: auto;
  padding: 5px 10px 0 5px;
  background-color: white;
`;
const ContentBox = styled.div`
  display: flex;
  padding: 7px;
  height: 100%;
  border: 0.1px solid rgba(106, 13, 173, 0.3);

  background-color: white;

  position: relative;
  /* margin-left: 20px; */
  float: left;
  border-radius: 7px;
  &::after {
    content: " ";
    position: absolute;
    right: -12px;
    top: 8px;
    border-top: 8.5px solid transparent;
    border-right: 8.5px solid rgba(106, 13, 173, 0.15);
    border-left: none;
    border-bottom: 8.5px solid transparent;
    transform: rotate(180deg);
  }
`;
const ContentAndAvatar = styled.div`
  display: flex;
`;

const StyledImg = styled.img`
  aspect-ratio: 1/1;

  border-radius: 100px;
  height: 40px;
  margin-left: 12px;
`;

const StyledSpan = styled.span`
  font-size: 0.8rem;
  opacity: 0.3;
  font-style: italic;
  margin-bottom: 3px;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledDiv1 = styled.div`
  display: flex;
`;
const StyledDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;
const showReplies = styled.div``;
const CommentCount = styled.span`
  font-size: 0.7rem;
  opacity: 0.5;
  align-self: center;
  margin-left: -4.5px;
`;
const Wrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  margin-left: 7px;
  flex-direction: row;
  height: 100%;
  margin-bottom: 5px;
`;
const ChildrenLinker = styled.div`
  display: flex;
  min-width: none;
  background-color: white;
  width: 6px;
  min-height: 10px;
  height: auto;
  margin-top: -10px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 10px;
  /* margin-bottom: 10px; */
  cursor: pointer;
`;

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  timeStyle: "short",
  dateStyle: "medium",
});

export const SingleCommentContext = React.createContext();
//
export const CommentCard = React.memo(({ eachComment }) => {
  let getReplies = () => {
    // just need it to be a function from start
  };
  // const { getReplies } = useContext(SinglePostContext);
  const singlePostContext = useContext(SinglePostContext);
  const postDetails = singlePostContext?.postDetails;
  getReplies = singlePostContext?.getReplies;
  const user = useSelector((state) =>
    selectUserById(state, eachComment?.userId)
  );
  const replies = getReplies(eachComment?.id);
  // console.log(replies);
  const [showChildren, setShowChildren] = useState(false);

  return (
    <SingleCommentContext.Provider value={{ eachComment, user }}>
      <Layout>
        <Layout1>
          <StyledSpan>
            {/* {dateFormatter.format(Date.parse(eachComment?.createdAt))} */}
            <TimeAgo timeStamp={eachComment?.createdAt} />
          </StyledSpan>
          <ContentAndAvatar>
            <StyledDiv>
              <BroadcastComment
                commentId={eachComment?.id}
                postId={postDetails?.id}
              />
              <LikeComment commentId={eachComment?.id} />
            </StyledDiv>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                marginLeft: "20px",
              }}
            >
              <ContentBox onClick={() => setShowChildren(!showChildren)}>
                {eachComment?.body}
              </ContentBox>
              <StyledDiv1>
                {/* <ChatBubble
                  // color="disabled"
                  sx={{
                    transform: "scale(0.8)",
                    cursor: "pointer",
                    marginLeft: "-3px",
                  }}
                /> */}
                {eachComment.children.length > 0 && (
                  <div
                    className={styles.replies}
                    onClick={() => setShowChildren(!showChildren)}
                  >
                    replies
                    <ArrowDropDown />
                  </div>
                )}
                {eachComment.children.length > 0 && (
                  <CommentCount>{eachComment?.children.length}</CommentCount>
                )}
                <div className={styles.commentInput}>
                  <ReplyComment />
                </div>
              </StyledDiv1>
            </div>
            <StyledDiv2>
              <StyledImg src={user?.profileImageSrc} />
            </StyledDiv2>
          </ContentAndAvatar>
        </Layout1>

        {eachComment?.children.length > 0 && (
          <Wrapper>
            <ChildrenLinker onClick={() => setShowChildren(!showChildren)} />
            <ChildrenCommentsList
              showChildrenProps={showChildren}
              childrenComments={replies}
            />
          </Wrapper>
        )}
      </Layout>
    </SingleCommentContext.Provider>
  );
});
