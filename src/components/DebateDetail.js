import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./DebateDetail.module.css";
import OpinionBarChart from "./OpinionBarChart";
import TopComments from "./comment/TopComments";
import CommentSection from "./comment/CommentSection";
import { useParams } from "react-router-dom";
import NavBar from "./nav_bar/NavBar";
import { calculatePercentage } from "../utils/calculatePercent";

const DebateDetail = () => {
  const { id } = useParams();
  const [debate, setDebate] = useState(null);
  const [comments, setComments] = useState([]);
  const [topCommentA, setTopCommentA] = useState(null);
  const [topCommentB, setTopCommentB] = useState(null);

  const updateTopComments = () => {
    const topAComments = comments
      .filter((c) => c.selectOption === "A")
      .sort(
        (a, b) =>
          b.likes - a.likes || new Date(a.createdAt) - new Date(b.createdAt)
      );
    const topBComments = comments
      .filter((c) => c.selectOption === "B")
      .sort(
        (a, b) =>
          b.likes - a.likes || new Date(a.createdAt) - new Date(b.createdAt)
      );

    const newTopCommentA = topAComments[0];
    const newTopCommentB = topBComments[0];

    setTopCommentA(newTopCommentA);
    setTopCommentB(newTopCommentB);
  };

  const handleNewComment = async () => {
    try {
      const commentsResponse = await axios.get(`/comment/${id}`);
      const newComments = commentsResponse.data;
      setComments(newComments);
      updateTopComments(); // 댓글이 추가될 때 최상단 댓글 업데이트
    } catch (error) {
      console.error("Error fetching the updated comments", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const debateResponse = await axios.get(`/post/${id}`);
        setDebate(debateResponse.data);

        const commentsResponse = await axios.get(`/comment/${id}`);
        const loadedComments = commentsResponse.data;
        console.log(loadedComments);
        setComments(loadedComments);

        // 초기 댓글 로딩 시 최상단 댓글 설정
        const initialTopAComments = loadedComments
          .filter((c) => c.selectOption === "A")
          .sort(
            (a, b) =>
              b.likeCount - a.likeCount ||
              new Date(a.createdAt) - new Date(b.createdAt)
          );
        const initialTopBComments = loadedComments
          .filter((c) => c.selectOption === "B")
          .sort(
            (a, b) =>
              b.likeCount - a.likeCount ||
              new Date(a.createdAt) - new Date(b.createdAt)
          );

        setTopCommentA(initialTopAComments[0]);
        setTopCommentB(initialTopBComments[0]);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    }

    fetchData();
  }, [id]);

  if (!debate) {
    return <div>Loading...</div>;
  }

  const opinionCounts = comments.reduce(
    (acc, comment) => {
      if (comment.selectOption === "A") acc.A++;
      if (comment.selectOption === "B") acc.B++;
      return acc;
    },
    { A: 0, B: 0 }
  );

  const { percentageA, percentageB } = calculatePercentage(
    opinionCounts.A,
    opinionCounts.B
  );

  return (
    <div className={styles.detailContainer}>
      <NavBar />
      <h2>{debate.title}</h2>
      <OpinionBarChart
        opinionA={percentageA}
        opinionB={percentageB}
        choiceA={debate.optionA}
        choiceB={debate.optionB}
      />
      <TopComments topCommentsA={topCommentA} topCommentsB={topCommentB} />
      <CommentSection
        comments={comments}
        postId={id}
        onNewComment={handleNewComment}
      />
    </div>
  );
};

export default DebateDetail;
