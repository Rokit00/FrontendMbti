// SectionOne.js
import React from "react";
import "./SectionOne.css";
import styles from "../../../components/Input.module.css"
import Checking from "../../../assets/WE-Checking.png";
import Talking from "../../../assets/WE-Talking.png";
import Yeonjin from "../../../assets/ISFP-B.png";

const SectionOne = ({ handleScrollToSectionTwo }) => {
  return (
    <div className="section-one">
      <div className="logobox">
        <span id="logotext">
          WE-ING<hr></hr>
        </span>
      </div>

      {/*박스구분*/}
      <div className="maincontainer">
        <div className="contentsbox">
          <span className="content-title">WE-Checking</span>
          <img src={Checking} className="Checkingimg"></img>
        </div>

        <div className="maincontainer2">
          <div className="p">
            우리 그룹 또는 상대방과의 케미를 체크해보세요{" "}
          </div>
          <div className="mainbtnbox">
            <button className={styles.contentsbutton} onClick={handleScrollToSectionTwo}>확인하기</button>
          </div>
        </div>
      </div>
      {/*박스구분*/}

      {/*박스구분*/}
      <div className="maincontainer">
        <div className="contentsbox">
          <span className="content-title">WE-Talking</span>
          <img src={Talking} className="Talkingimg"></img>
        </div>

        <div className="maincontainer2">
          <div className="p">우리만의 주제로 MBTI 토론 배틀 Go?</div>
          <div className="mainbtnbox">
            <button className={styles.contentsbutton} onClick={handleScrollToSectionTwo}>확인하기</button>
          </div>
        </div>
      </div>
      {/*박스구분*/}
      <div>
        <img src={Yeonjin} className="Yeonjin"></img>
        <button className={styles.contentsbutton} onClick={() => (window.location.href = "/Mychemilist")}>
          마이페이지
        </button>
      </div>
    </div>
  );
};

export default SectionOne;
