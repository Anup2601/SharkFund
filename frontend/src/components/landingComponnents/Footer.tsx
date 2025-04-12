import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer dark-bg">
      <div className="container footer-content">
        {/* Logo & Text */}
        <div className="footer-left">
          <h2>SharkFund</h2>
          <p>Service is the cornerstone of our existence, underpinning everything we do. Without your loyalty and custom, we can't grow our brand and influence. Your success directly links to ours.</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-center">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#section1">Home</a></li>
            <li><a href="#section2">Company</a></li>
            <li><a href="#section6">Features</a></li>
            <li><a href="#section8">Vision</a></li>
            <li><a href="#section10">Contact</a></li>
          </ul>
        </div>

        {/* Social Links */}
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
        &copy; Copyright {new Date().getFullYear()} SharkFund. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
