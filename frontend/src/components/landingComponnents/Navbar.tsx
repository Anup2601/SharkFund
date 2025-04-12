import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">MyLogo</div>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <a href="#home">Home</a>
          <a href="#company">Company</a>
          <a href="#features">Features</a>
          <a href="#vision">Vision</a>
          <a href="#contact">Contact Us</a>
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
