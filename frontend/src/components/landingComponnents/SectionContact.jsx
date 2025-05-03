import React from "react";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import "./SectionContact.css";

const SectionContact = ({ id, bgColor }) => {
  return (
    <section id={id} className={`section-contact ${bgColor}`}>
      <div className="container">
        <div className="contact-content">
          {/* Left - Form */}
          <div className="contact-form">
            <h2>Get in Touch</h2>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="text" placeholder="Subject" required />
              <textarea placeholder="Your Message" rows="5" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>

          {/* Right - Address */}
          <div className="contact-info">
            <h3>Contact Info</h3>
            <p><FaMapMarkerAlt className="icon" /> 123 Main Street, Mumbai, India</p>
            <p><FaEnvelope className="icon" /> contact@company.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionContact;
