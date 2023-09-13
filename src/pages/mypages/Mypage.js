import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Mypage.module.css";

export const Mypage = () => {
  const menu = [
    "내가 만든 케미",
    "내가 만든 토론",
    "내 정보",
    "문의하기",
    "회원탈퇴",
  ];
  return (
    <div className={styles.Box1}>
      <div className={styles.menulist}>
        <NavLink to="/" className={styles["no-decoration"]}>
          <span>홈으로 돌아가기</span>
        </NavLink>

        <NavLink to="/Mychemilist" className={styles["no-decoration"]}>
          <span>{menu[0]}</span>
        </NavLink>
        <NavLink to="/Mydiscussion" className={styles["no-decoration"]}>
          <span>{menu[1]}</span>
        </NavLink>
        <NavLink to="/profile" className={styles["no-decoration"]}>
          <span>{menu[2]}</span>
        </NavLink>
        <NavLink to="/Q&A" className={styles["no-decoration"]}>
          <span>{menu[3]}</span>
        </NavLink>
        <NavLink to="/delete-account" className={styles["no-decoration"]}>
          <span>{menu[4]}</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Mypage;
