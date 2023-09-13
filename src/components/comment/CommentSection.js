import React, { useRef, useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import UserInfo from "../UserInfo";
import CommentText from "./CommentText";
import styles from "./CommentSection.module.css";
import axios from "axios";

const CommentSection = ({
  comments: initialComments,
  postId,
  onNewComment,
}) => {
  const [allComments, setAllComments] = useState(initialComments || []);
  const endOfCommentsRef = useRef(null);

  useEffect(() => {
    if (initialComments) {
      setAllComments(initialComments);
    }
  }, [initialComments]);

  useEffect(() => {
    if (endOfCommentsRef.current) {
      endOfCommentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allComments]);

  const handleCommentSubmit = async (newCommentData) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("로그인한 뒤에 이용할 수 있습니다.");
      return;
    }

    try {
      const response = await axios.post(`/comment/${postId}`, newCommentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllComments((prevComments) => [...prevComments, response.data]);
      onNewComment();
    } catch (error) {
      console.error("Error", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleLike = async (commentId) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("로그인한 뒤에 이용할 수 있습니다.");
      return;
    }

    try {
      const response = await axios.post(
        `/comment/${commentId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedLikes = response.data;
      setAllComments((prevComments) => {
        const updatedComments = prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, likeCount: updatedLikes }
            : comment
        );
        return updatedComments;
      });
    } catch (error) {
      console.error("Error", error);
      alert("댓글 좋아요 변경에 실패했습니다.");
    }
  };
  console.log(allComments);

  return (
    <div>
      <div className={styles.commentsContainer}>
        <h3>All Comments</h3>
        {allComments.map((comment) => (
          <div
            key={comment.id}
            className={`${styles.comment} ${
              comment.selectOption === "A" ? styles.opinionA : styles.opinionB
            }`}
          >
            <UserInfo
              userImage={comment.profileImage}
              userId={comment.userId}
              mbti={comment.mbti}
              opinion={comment.selectOption}
            />
            <CommentText
              comment={comment.content}
              likes={comment.likeCount}
              date={comment.createdAt}
              opinion={comment.selectOption}
              onLike={() => handleLike(comment.id)}
            />
          </div>
        ))}
      </div>
      <CommentForm onSubmit={handleCommentSubmit} />
      <div ref={endOfCommentsRef}></div>
    </div>
  );
};

export default CommentSection;
