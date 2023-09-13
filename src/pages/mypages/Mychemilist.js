import React from "react";
import styles from "./Mypage.module.css";
import { Mypage } from "./Mypage";

const Mychemilist = () => {
  return (
    <section className={styles.Myinfo}>
      <Mypage />
      <div className={styles.Box2}>
        <div className={styles.Mycontentlist}>
          <h1 className={styles.h1}>내가 만든 케미</h1>
          <p className={styles.p}>너를 위해 구웠지🍪</p>
        </div>
      </div>
    </section>
  );
};

export default Mychemilist;
