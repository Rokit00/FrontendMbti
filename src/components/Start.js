import React from "react";
import styles from "./Start.module.css"; // Start 컴포넌트에 적용할 CSS 스타일 임포트
import style from "./Input.module.css";

//솔지님 이미지 세트//
import Solji_A from "../assets/Solji_A.png";
import Solji_B from "../assets/Solji_B.png";

//수훈님 이미지 세트//
import Suhun_A from "../assets/Suhun_A.png";
import Suhun_B from "../assets/Suhun_B.png";

//연진님 이미지 세트//
import Yeonjin_A from "../assets/Yeonjin_A.png";
import Yeonjin_B from "../assets/Yeonjin_B.png";

//성환님 이미지 세트//
import Seonghwan_a from "../assets/Seonghwan_a.png";
import Seonghwan_b from "../assets/Seonghwan_b.png";

const Start = ({ handleStart }) => {
  return (
    // Start 컴포넌트의 주요 컨테이너
    <div className={styles.content}>
      <div className={styles["left-content"]}>
        <div className={styles.imgBox}>
          <img src={Solji_A} className={styles.Solji_A}></img>
          <img src={Solji_B} className={styles.Solji_B}></img>
        </div>

        <div className={styles.imgBox}>
          <img src={Suhun_A} className={styles.Suhun_A}></img>
          <img src={Suhun_B} className={styles.Suhun_B}></img>
        </div>
      </div>

      <div className={styles["middle-content"]}>
        <h3 className={styles.h3}>Chemi 핯 Check</h3> {/* 제목 */}
        <p className={styles.p}>
          <b className={styles.b}>핮</b> 너랑 나랑, 얘랑 재랑{" "}
          <b className={styles.b}>핱</b>
          <br></br>
          <b className={styles.b}>럾</b>
          <br></br>
          <b className={styles.b}>볅</b> 우리 성격 잘 맞을까?{" "}
          <b className={styles.b}>슿</b> <br></br>
          <b className={styles.b}>낰</b>
          <br></br>
        </p>{" "}
        {/* 설명 */}
        {/* 시작하기 버튼, 'handleStart' 함수 실행 */}
        <button className={style.contentsbutton} onClick={handleStart}>
          확인해보자
        </button>
      </div>

      {/* 오른쪽 컨텐츠: 제목, 설명, 시작하기 버튼 */}
      <div className={styles["right-content"]}>
        <div className={styles.imgBox}>
          <img src={Seonghwan_a} className={styles.Seonghwan_a}></img>
          <img src={Seonghwan_b} className={styles.Seonghwan_b}></img>
        </div>
        <div className={styles.imgBox}>
          <img src={Yeonjin_A} className={styles.Yeonjin_A}></img>
          <img src={Yeonjin_B} className={styles.Yeonjin_B}></img>
        </div>
      </div>
    </div>
  );
};

export default Start;
