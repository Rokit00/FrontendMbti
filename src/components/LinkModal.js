import React from "react";
import linkStyles from "./LinkModal.module.css";

const LinkModal = ({ sharedLink, handleCopyLink, closeModal }) => {
  return (
    <div className={linkStyles.modal}>
      <div className={linkStyles.modalContent}>
        <h3>링크 공유</h3>
        <input
          type="text"
          value={sharedLink}
          readOnly
          onClick={(e) => e.target.select()}
        />
        <div className={linkStyles.buttons}>
          <button onClick={closeModal}>취소</button>
          <button onClick={handleCopyLink}>복사</button>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
