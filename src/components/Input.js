import React from "react";
import styles from "./Input.module.css";

const Input = ({
  name,
  handleNameChange,
  handleDelete,
  selectedImageIndexes,
  images,
  handleImageClick,
  handleSave,
  renderSavedData,
  handleShowResult,
  mbtiTexts,
}) => {
  return (
    <div className={styles.content}>
      <div className={styles["mbti-check-heading"]}>
        {" "}
        <span> MBTI &nbsp; Check </span>
      </div>

      <div className={styles["content-container"]}>
        <div className={styles["mbti-check-left-container"]}>
          <div className={styles["left-content"]}>
            <label id="nameLabel" htmlFor="name">
              이름:{" "}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="이름을 입력하세요"
            />
            <div className={styles["text-grid"]}>
              {mbtiTexts.map((text, textIndex) => (
                <span
                  key={textIndex}
                  className={`${styles[text]} ${
                    selectedImageIndexes[Math.floor(textIndex / 2)] ===
                    textIndex
                      ? `${styles.selected}`
                      : ""
                  }`}
                  onClick={() =>
                    handleImageClick(Math.floor(textIndex / 2), textIndex)
                  }
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
          <button className={styles["result-btn"]} onClick={handleSave}>저장하기</button>
        </div>
        <div className={styles["right-container"]}>
          <div className={styles["right-content"]}>
            <div className={styles["result-data"]}>{renderSavedData()}</div>
          </div>
          <button className={styles["result-btn"]} onClick={handleShowResult}>
            결과보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
