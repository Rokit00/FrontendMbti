import React, { useState, useEffect } from "react";
import styles from "./Timer.module.css";

function CountdownTimer({ createdDate }) {
  const targetDate = new Date(createdDate);
  targetDate.setDate(targetDate.getDate() + 7);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;
    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <div id={styles.countdown}>
      <div id={styles.tiles}>
        <span>{timeLeft.days}</span>
        <span>{timeLeft.hours}</span>
        <span>{timeLeft.minutes}</span>
        <span>{timeLeft.seconds}</span>
      </div>
      <div className={styles.labels}>
        <li>Days</li>
        <li>Hours</li>
        <li>Mins</li>
        <li>Secs</li>
      </div>
    </div>
  );
}

export default CountdownTimer;
