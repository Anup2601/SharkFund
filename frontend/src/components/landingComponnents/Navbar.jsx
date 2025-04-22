import { React, useState } from "react";
import "./Navbar.css";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo golden-text"><img src="/Logo.png" alt="SharkFund"></img></div>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <a class="golden-text" href="#home">Home</a>
          <a class="golden-text" href="#company">Company</a>
          <a class="golden-text" href="#features">Features</a>
          <a class="golden-text" href="#vision">Vision</a>
          <a class="golden-text" href="#contact">Contact Us</a>
          <a href="/login"><button className="login-btn">Login / Register</button></a>
        </div>

        <div className="hamburger" onClick={handleToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
