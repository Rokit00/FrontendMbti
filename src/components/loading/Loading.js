import React, { useEffect } from "react";
import "./Loading.css";

const Loading = () => {
  // Function to apply the neonGlory effect to a specific target element
  const neonGlory = (target) => {
    target.innerHTML = flickerAndColorText(target.textContent);
  };

  // Your existing JavaScript functions
  const flickerLetter = (letter) =>
    `<span style="animation: text-flicker-in-glow ${
      Math.random() * 4
    }s linear both ">${letter}</span>`;

  const colorLetter = (letter) =>
    `<span style="color: hsla(${
      Math.random() * 360
    }, 100%, 80%, 1);">${letter}</span>`;

  const flickerAndColorText = (text) =>
    text.split("").map(flickerLetter).map(colorLetter).join("");

  useEffect(() => {
    // Find all elements with the class "Loading"
    const targets = document.querySelectorAll(".loading");

    // Apply the neonGlory effect to all elements with the class "Loading"
    targets.forEach((target) => {
      neonGlory(target);
      target.onclick = ({ target }) => neonGlory(target);
    });
  }, []); // Empty dependency array to ensure this effect runs once on component mount

  return (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
