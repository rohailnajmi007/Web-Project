import React from 'react';
import { assets } from '../assets/assets';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-img-col">
        <img src={assets.contact_img} alt="Contact Forever" className="contact-img" />
      </div>
      <div className="contact-content-col">
        <h2 className="contact-title">
          <span className="contact-title-gray">CONTACT</span> <span className="contact-title-black">US</span>
          <span className="contact-title-line" />
        </h2>
        <div className="contact-info-block">
          <div className="contact-info-title">Our Store</div>
          <div className="contact-info-address">
            54709 Willms Station<br />
            Suite 350, Washington, USA
          </div>
          <div className="contact-info-details">
            Tel: (415) 555-0132<br />
            Email: admin@forever.com
          </div>
        </div>
        <div className="contact-careers-block">
          <div className="contact-careers-title">Careers at Forever</div>
          <div className="contact-careers-desc">Learn more about our teams and job openings.</div>
          <button className="contact-jobs-btn">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;