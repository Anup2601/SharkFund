import React from "react";
import "./SectionTextButton.css"; // for styling

const SectionTextButton = ({ id, bgColor, title, text, buttonText }) => {
  return (
    <section id={id} className={`section-text-button ${bgColor}`}>
      <div className="container">
        <h2>{title}</h2>
        <p>{text}</p>
        <button>{buttonText}</button>
      </div>
    </section>
  );
};

export default SectionTextButton;
