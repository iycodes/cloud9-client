import React from "react";
import styles from "./RepostCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { selectPostById } from "../../features/posts/postsApiSlice";
import { useSelector } from "react-redux";

import { selectUserById } from "../../features/users/usersApiSlice";
import { EachPostContext } from "../Homepage/Homepage";
import { useContext } from "react";

import { BroadcastPost } from "../../features/posts/broadcastPost";
import { Likes } from "../../features/posts/Likes";
import styled from "styled-components";

import { selectCommentById } from "../FullPostPage/fullPostPage";
import { useGetCommentByIdQuery } from "../../features/posts/commentsApiSlice";
import { BroadcastComment } from "../comment/BroadcastComment";
import { BiRepost } from "react-icons/bi";
import { LikeComment } from "../comment/LikeComment";
import { MoreOptions } from "../PostCard1/moreOptions";
import { CommentCount } from "../PostCard1/CommentCount";
import { TimeAgo } from "../PostCard1/TimeAgo";
import { QuotePost } from "../PostCard1/quotePost";
//

//
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const AvatarWrapper = styled.div`
  display: flex;
  height: 50%;
`;

//
export const RepostCard = React.memo(({ postIdProp }) => {
  const eachPostContext = useContext(EachPostContext);
  const postIdcontext = eachPostContext?.postId || postIdProp;

  const eachPost = useSelector((state) => selectPostById(state, postIdcontext));
  const navigate = useNavigate();

  let eachUser;
  let eachUser_BC;
  let broadcastedPost;
  let broadcastedComment;
  broadcastedPost = useSelector((state) =>
    selectPostById(state, eachPost?.ogPostId)
  );

  broadcastedComment = useGetCommentByIdQuery(eachPost?.ogPostId)?.data;
  console.log(broadcastedComment);
  eachUser = useSelector(
    (state) =>
      selectUserById(
        state,
        eachPost?.title != "BROADCAST"
          ? eachPost?.userId
          : broadcastedPost?.userId
      )
    //eachPost?.userId ?? broadcastedPost?.userId
  );
  eachUser_BC = useSelector((state) =>
    selectUserById(state, broadcastedPost?.userId || broadcastedComment?.userId)
  );

  // console.log(eachPost);

  let eachPostRendered;
  //   if (eachPost?.title == "POST") {
  //     eachPostRendered = (
  //       <div className={styles.layout}>
  //         <div className={styles.top}>
  //           <div className={styles.top1}>
  //             <div className={styles.authorName}>{eachPost?.displayName}</div>
  //           </div>
  //           <div className={styles.top2}>
  //             <TimeAgo timeStamp={eachPost?.createdAt} />
  //             <QuotePost />
  //             <MoreOptions postId={eachPost?.id} />
  //           </div>
  //         </div>
  //         <div className={styles.middle}>
  //           <div>
  //             <AvatarWrapper>
  //               <Link to={`/user/${eachPost ? eachPost.userId : ""}`}>
  //                 <img
  //                   className={styles.avatar}
  //                   src={eachUser?.profileImageSrc}
  //                 />
  //               </Link>
  //             </AvatarWrapper>
  //           </div>
  //           <Wrapper>
  //             <div
  //               className={styles.contentBox}
  //               onClick={(e) => {
  //                 navigate(`post/${eachPost?.id}`);
  //               }}
  //             >
  //               {eachPost?.body}
  //             </div>
  //             <CommentCount postId={eachPost?.id} />
  //           </Wrapper>
  //           <div className={styles.interactions}>
  //             <BroadcastPost postId={postIdcontext} />
  //             <Likes postId={eachPost?.id} />
  //           </div>
  //         </div>
  //         {/* <PostInteractions styleProps={styles.bottom} postId={postIdcontext } /> */}
  //       </div>
  //     );
  //   }

  if (eachPost?.title == "BROADCAST") {
    eachPostRendered = (
      <div className={styles.layout}>
        <div className={styles.rbc}>
          <BiRepost color="purple" />
          <div className={styles.authorName}>{eachPost?.displayName}</div>
        </div>
        <div className={styles.top}>
          <div className={styles.top1}>
            <div className={styles.authorName}>
              {broadcastedPost?.displayName}
            </div>
          </div>
          <div className={styles.top2}>
            <TimeAgo timeStamp={broadcastedPost?.createdAt} />
            <QuotePost className={styles.quote} />
            <MoreOptions className={styles.moreOptions} postId={eachPost?.id} />
          </div>
        </div>
        <div className={styles.middle}>
          <div>
            <Link to={`/user/${broadcastedPost ? broadcastedPost.userId : ""}`}>
              <img
                className={styles.avatar}
                src={eachUser_BC?.profileImageSrc}
              />
            </Link>
          </div>
          <Wrapper>
            <div
              className={styles.contentBox}
              onClick={(e) => {
                navigate(`post/${eachPost?.id}`);
              }}
            >
              {broadcastedPost?.body}
            </div>
            <CommentCount postId={broadcastedPost?.id} />
          </Wrapper>
          <div className={styles.interactions}>
            <BroadcastPost
              ogPostId={eachPost?.id}
              postId={broadcastedPost?.id}
            />
            <Likes postId={broadcastedPost?.id} />
          </div>
        </div>
      </div>
    );
  }
  //   if (eachPost?.title == "BC_COMMENT") {
  //     eachPostRendered = (
  //       <div className={styles.layout}>
  //         <div className={styles.rbc}>
  //           <BiRepost color="purple" />
  //           <div className={styles.authorName}>{eachPost?.displayName}</div>
  //         </div>
  //         <div className={styles.top}>
  //           <div className={styles.top1}>
  //             <div className={styles.authorName1}>
  //               {broadcastedComment?.displayName}
  //             </div>
  //           </div>
  //           <div className={styles.top2}>
  //             <TimeAgo timeStamp={broadcastedComment?.createdAt} />
  //             <QuotePost className={styles.quote} />
  //             <MoreOptions className={styles.moreOptions} postId={eachPost?.id} />
  //           </div>
  //         </div>
  //         <div className={styles.middle}>
  //           <div>
  //             <Link
  //               to={`/user/${
  //                 broadcastedComment ? broadcastedComment.userId : ""
  //               }`}
  //             >
  //               <img
  //                 className={styles.avatar}
  //                 src={eachUser_BC?.profileImageSrc}
  //               />
  //             </Link>
  //           </div>
  //           <Wrapper>
  //             <div
  //               className={styles.contentBox}
  //               onClick={(e) => {
  //                 navigate(`post/${eachPost?.id}`);
  //               }}
  //             >
  //               {broadcastedComment?.body}
  //             </div>
  //             <CommentCount postId={broadcastedComment?.id} />
  //           </Wrapper>
  //           <div className={styles.interactions}>
  //             <BroadcastComment
  //               ogPostId={eachPost?.id}
  //               postId={broadcastedComment?.postId}
  //               commentId={broadcastedComment?.id}
  //             />
  //             <LikeComment_BC_COMMENT commentId={broadcastedComment?.id} />
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  //
  return <>{eachPost?.title != "DELETED" && eachPostRendered}</>;
});
