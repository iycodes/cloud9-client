import React from "react";
import styles from "./quotedPost_PostCard.module.css";
import { Link } from "react-router-dom";
import { selectPostById } from "../../features/posts/postsApiSlice";
import { useSelector } from "react-redux";
import { selectUserById } from "../../features/users/usersApiSlice";
import { useContext } from "react";
import { EachPostContext } from "../Homepage/Homepage";
//

export const QuotedPost_PostCard = React.memo(({ postIdProp }) => {
  const { postId } = useContext(EachPostContext);

  //  //
  const eachPost = useSelector((state) => selectPostById(state, postId));

  let eachUser;
  let broadcastedPost;
  broadcastedPost = useSelector((state) =>
    selectPostById(state, eachPost?.ogPostId)
  );
  eachUser = useSelector((state) =>
    selectUserById(state, eachPost?.userId ?? broadcastedPost?.userId)
  );

  console.log(eachPost);

  let eachPostRendered;
  if (eachPost.title == "POST") {
    eachPostRendered = (
      <div
        className={styles.layout}
        style={{
          paddingBottom: "20px",
        }}
      >
        <div className={styles.top}>
          <div className={styles.top1}>
            <div className={styles.authorName}>{eachPost.name}</div>
          </div>
        </div>
        <div className={styles.middle}>
          <div>
            <Link to={`/user/${eachPost ? eachPost.userId : ""}`}>
              <img className={styles.avatar} src={eachUser?.profileImageSrc} />
            </Link>
          </div>
          <div className={styles.contentBox}>{eachPost.body}</div>
        </div>
      </div>
    );
  }

  if (eachPost.title == "BROADCAST") {
    eachPostRendered = (
      <div className={styles.layout}>
        <span>Reposted</span>
        <div className={styles.top}>
          <div className={styles.top1}>
            <div className={styles.authorName1}>{broadcastedPost?.name}</div>
          </div>
        </div>
        <div className={styles.middle}>
          <div>
            <Link to={`/user/${broadcastedPost ? broadcastedPost.userId : ""}`}>
              <img className={styles.avatar} src={eachUser?.profileImageSrc} />
            </Link>
          </div>
          <div className={styles.contentBox}>{broadcastedPost?.body}</div>
        </div>
      </div>
    );
  }

  //
  return <>{eachPost.title != "DELETED" && eachPostRendered}</>;
});
