import React, { useState, useEffect, useRef } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const footerRef = useRef(null);

  // Toggle footer expansion
  const toggleFooter = () => {
    setIsExpanded((prev) => !prev);
  };

  // Collapse on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (footerRef.current && !footerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <footer
      className={`footer dark-bg ${isExpanded ? "expanded" : "collapsed"}`}
      ref={footerRef}
      onClick={toggleFooter}
    >
      <div className="container footer-content">
        <img className="img-shark" src="/Logo.png" alt="SharkFund" />
        <div className="footer-left">
          <p>
            Service is the cornerstone of our existence, underpinning
            everything we do. Without your loyalty and custom, we can't grow
            our brand and influence. Your success directly links to ours.
          </p>
        </div>

        <div className="footer-center">
          <h3>Quick Links</h3>
          <ul className="golden-text">
            <li><a href="#section1">Home</a></li>
            <li><a href="#section2">Company</a></li>
            <li><a href="#section6">Features</a></li>
            <li><a href="#section8">Vision</a></li>
            <li><a href="#section10">Contact</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <h3>Follow</h3>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} SharkFund. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
