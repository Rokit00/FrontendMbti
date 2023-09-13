import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShare, FaComment, FaEye } from "react-icons/fa";
import styles from "./DebateCard.module.css";
import { calculatePercentage } from "../../utils/calculatePercent";

const DebateCard = ({ debate }) => {
  const { id, title, A, B, messages, views, isUnderway, hashtags, likes } =
    debate;
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href + `/post/${id}`);
    alert("링크가 클립보드에 복사되었습니다.");
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setShowModal(!showModal);
  };

  const handleLikeClick = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("로그인한 뒤에 이용할 수 있습니다.");
      return;
    }

    try {
      await axios.post(
        `/post/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLiked(!isLiked);
      if (isLiked) {
        alert("좋아요를 취소했습니다.");
      } else {
        alert("좋아요를 눌렀습니다.");
      }
    } catch (error) {
      console.error("Error", error);
      alert("좋아요 추가에 실패했습니다.");
    }
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/comment/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching the comments", error);
      }
    };

    fetchComments();
  }, [id]);

  const opinionCounts = comments.reduce(
    (acc, comment) => {
      acc[comment.selectOption]++;
      return acc;
    },
    { A: 0, B: 0 }
  );

  const { percentageA, percentageB } = calculatePercentage(
    opinionCounts.A,
    opinionCounts.B
  );

  const iconsData = [
    { Icon: FaComment, data: messages },
    { Icon: FaEye, data: views },
    {
      Icon: FaHeart,
      onClick: handleLikeClick,
      data: likes,
    },
    { Icon: FaShare, onClick: handleModalClick },
  ];

  return (
    <div>
      <Link to={`/post/${id}`} className={styles.container}>
        {isUnderway && <small className={styles.underwayText}>New</small>}
        <div className={styles.cardInfo}>
          <h3 className={styles.title}>Q.{title}</h3>
          <p className={styles.percent}>
            A. {percentageA}% vs B. {percentageB}%
          </p>
          <div className={styles.options}>
            <p className={styles.option}>{A}</p>
            <p className={styles.option}>{B}</p>
          </div>
          <div className={styles.hashtags}>{hashtags}</div>
        </div>

        <div className={styles.icons}>
          {iconsData.map(({ Icon, data, onClick }, idx) => (
            <div key={idx} className={styles.iconWrapper} onClick={onClick}>
              <Icon />
              {data && <span>{data}</span>}
            </div>
          ))}
        </div>
      </Link>
      {showModal && (
        <div className={styles.modalContainer} onClick={handleModalClick}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <p>Share this link:</p>
            <input
              type="text"
              value={window.location.href + `/post/${id}`}
              readOnly
            />
            <div>
              <button onClick={handleModalClick}>취소</button>
              <button onClick={handleCopyLink}>복사</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebateCard;
