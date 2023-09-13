// CommentText.js
import React from "react";
import styles from "./CommentText.module.css";

const CommentText = ({ comment, likes, date, opinion, onLike}) => (
  <div
    className={`${styles.text} ${
      opinion === "A" ? styles.opinionA : styles.opinionB
    }`}
  >
    {comment}
    <div className={styles.commentActions}>
      <span className={styles.likeButton} onClick={onLike}>👍 {likes || 0}</span>
      <span className={styles.reportButton}>🚫 신고하기</span>
      <span className={styles.commentDate}>{date}</span>
    </div>
  </div>
);

export default CommentText;
