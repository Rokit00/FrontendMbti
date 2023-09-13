import React, { useState, useEffect } from "react";
import Login from "./Login";
import styles from "./LoginModal.module.css";

function LoginModal({ closeModal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    closeModal();
  };

  const customStyle = {
    border: "4px solid #fff",
    boxShadow: "0 0 15px #fff, inset 0 0 5px #fff",
    height: "680px",
    top: "-40px",
    overflow: "hidden",
  };

  return (
    isModalOpen && (
      <div className={styles.modalBackground}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              x
            </button>
            <Login
              customStyle={customStyle}
              onLoginSuccess={handleCloseModal}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default LoginModal;
