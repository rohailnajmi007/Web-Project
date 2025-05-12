import React, { useState } from 'react';
import { assets } from '../assets/assets';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1 className="contact-main-title">Get in Touch</h1>
        <p className="contact-subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <div className="contact-info-card">
            <div className="contact-info-icon">📍</div>
            <h3>Visit Us</h3>
            <p>54709 F10 <br />Near Fresco Bakers, Islamabad, Pakistan</p>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">📞</div>
            <h3>Call Us</h3>
            <p>Tel: (415) 555-0132<br />Mon-Fri: 9:00 AM - 6:00 PM</p>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">✉️</div>
            <h3>Email Us</h3>
            <p>admin@gearup.com<br />support@gearup.com</p>
          </div>
        </div>

        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                rows="5"
              />
            </div>

            <button type="submit" className="submit-button">
              Send Message
              <span className="button-arrow">→</span>
            </button>
          </form>
        </div>
      </div>

      <div className="contact-map-section">
        <div className="map-container">
          {/* Add your map component or iframe here */}
          <div className="map-placeholder">
            <img src={assets.contact_img} alt="Location Map" className="map-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;