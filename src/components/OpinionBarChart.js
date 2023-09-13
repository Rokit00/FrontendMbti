import React from "react";
import { calculatePercentage } from "../utils/calculatePercent";
import styles from "./OpinionBarChart.module.css";

const OpinionBarChart = ({ opinionA, opinionB, choiceA, choiceB }) => {
  const { percentageA, percentageB } = calculatePercentage(opinionA, opinionB);

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.choicesContainer}>
        <span className={styles.choiceTextA}>A. {choiceA}</span>
        <span className={styles.choiceTextB}>B. {choiceB}</span>
      </div>
      <div className={styles.barContainer}>
        <div className={styles.barA} style={{ width: `${percentageA}%` }}>
          <span className={styles.percentageText}>{percentageA}%</span>
        </div>
        <div className={styles.barB} style={{ width: `${percentageB}%` }}>
          <span className={styles.percentageText}>{percentageB}%</span>
        </div>
      </div>
    </div>
  );
};

export default OpinionBarChart;
