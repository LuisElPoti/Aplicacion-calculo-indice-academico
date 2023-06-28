import React from "react";
import Image from "next/image";
// import "./style.css";

export const Logo = ({ style }) => {
  return (
    <div className="logo" style={style}>
      <img className="img" alt="Logo" src="/images/Logo.svg" />
    </div>
  );
};