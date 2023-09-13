import React from "react";

const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        margin: "10px 0 20px",
        background: "#000",
        color: "#fff",
        position: "relative",
        top:"45px"
      }}
    >
      <div
        style={{
          flex: "1",
          borderTop: "1px solid #fff",
        }}
      />
      <span
        style={{
          padding: "0 10px",
        }}
      >
        {text}
      </span>
      <div
        style={{
          flex: "1",
          borderTop: "1px solid #fff",
        }}
      />
    </div>
  );
};

export default HorizonLine;