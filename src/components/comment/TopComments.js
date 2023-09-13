import React from "react";
import UserInfo from "../UserInfo";
import CommentText from "./CommentText";
import styles from "./TopComments.module.css";

const TopComments = ({ topCommentsA, topCommentsB }) => {
  const renderComment = (comment, opinionStyle) => (
    <div className={`${styles.comment} ${opinionStyle}`}>
      <UserInfo
        userImage={comment.userImage}
        userId={comment.userId}
        opinion={comment.selectOption}
        mbti={comment.mbti}
      />
      <CommentText
        comment={comment.content}
        opinion={comment.selectOption}
        likes={comment.likeCount}
      />
    </div>
  );

  return (
    <div className={styles.commentsContainer}>
      <h3>Top Comments</h3>
      <div className={styles.topCommentsWrapper}>
        {topCommentsA && renderComment(topCommentsA, styles.opinionA)}
        {topCommentsB && renderComment(topCommentsB, styles.opinionB)}
      </div>
    </div>
  );
};

export default TopComments;
