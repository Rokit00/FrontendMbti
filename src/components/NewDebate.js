import React, { useState } from "react";
import styles from "./NewDebate.module.css";
import NavBar from "./nav_bar/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewDebate() {
  const [newDebateData, setNewDebateData] = useState({
    title: "",
    A: "",
    B: "",
  });
  const { title, A, B } = newDebateData;

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDebateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!title || !A || !B) return;

    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const newDebate = {
      title,
      optionA: A,
      optionB: B,
      createdAt: new Date().getTime(),
      likeCount: 0,
      bookmark: false,
      view: 0,
    };

    try {
      await axios.post("/post/writer", newDebate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleCancel();
      navigate("/lists");
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleCancel = () => {
    setNewDebateData({
      title: "",
      A: "",
      B: "",
    });
  };

  return (
    <div className={styles.newDebate}>
      <NavBar />
      <div className={styles.container}>
        <h2 className={styles.title}>토론 작성하기</h2>
        <div className={styles.formWrpper}>
          <div className={styles.formContext}>
            <p className={styles.label}>토론 주제:</p>
            <input
              type="text"
              name="title"
              value={newDebateData.title}
              onChange={handleInputChange}
              maxLength={30}
              className={styles.input}
            ></input>
          </div>
          <div className={styles.formContext}>
            <p className={styles.label}>A 선택자:&nbsp;</p>
            <input
              type="text"
              name="A"
              maxLength={10}
              value={newDebateData.A}
              onChange={handleInputChange}
              className={styles.input}
            ></input>
          </div>
          <div className={styles.formContext}>
            <p className={styles.label}>B 선택자:&nbsp;</p>
            <input
              type="text"
              name="B"
              maxLength={10}
              value={newDebateData.B}
              onChange={handleInputChange}
              className={styles.input}
            ></input>
          </div>
          <div className={styles.buttonWrapper}>
            <button onClick={() => navigate("/lists")}>취소</button>
            <button onClick={handleSubmit}>작성하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDebate;
