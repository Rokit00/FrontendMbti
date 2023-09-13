import React from "react";
import { useNavigate } from "react-router-dom";
import OpinionBarChart from "../../../components/OpinionBarChart";
import styles from "./SectionThree.module.css";
import style from "../../../components/Input.module.css";

import "./SectionOne.css";

const SectionThree = ({ debate, percentageA, percentageB }) => {
  const navigate = useNavigate();

  if (!debate) {
    return <div>Loading...</div>;
  }

  const handleWriteDebate = () => {
    navigate("/lists");
  };

  return (
    <div className={styles.section_Three}>
      <div className={styles.section_Three_box}>
        <h2>{debate.title}</h2>
        <OpinionBarChart
          opinionA={percentageA}
          opinionB={percentageB}
          choiceA={debate.optionA}
          choiceB={debate.optionB}
        />
        <button className={style.contentsbutton} onClick={handleWriteDebate}>
          참여하기
        </button>
      </div>

      <div className={styles.testbox}></div>
    </div>
  );
};

export default SectionThree;
