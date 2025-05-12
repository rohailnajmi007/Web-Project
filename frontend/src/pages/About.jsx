import React, { useState } from "react";
import { assets } from "../assets/assets";
import "./About.css";

const About = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="about-outer-wrapper">
      <div className="about-container">
        <div className="about-img-col">
          <img
            src={assets.about_img}
            alt="About Forever"
            className="about-img"
          />
        </div>
        <div className="about-content-col">
          <h2 className="about-title">
            <span className="about-title-gray">ABOUT</span>{" "}
            <span className="about-title-black">US</span>
            <span className="about-title-line" />
          </h2>
          <p className="about-text">
            GearUp was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p className="about-text">
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <h3 className="about-mission-title">Our Mission</h3>
          <p className="about-text">
            Our mission at GearUp is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>
      <div className="why-choose-section">
        <h3 className="why-choose-title">
          WHY <span>CHOOSE US</span> <span className="why-choose-line" />
        </h3>
        <div className="why-choose-cards">
          <div className="why-choose-card">
            <div className="why-choose-card-title">Quality Assurance:</div>
            <div className="why-choose-card-desc">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </div>
          </div>
          <div className="why-choose-card">
            <div className="why-choose-card-title">Convenience:</div>
            <div className="why-choose-card-desc">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </div>
          </div>
          <div className="why-choose-card">
            <div className="why-choose-card-title">
              Exceptional Customer Service:
            </div>
            <div className="why-choose-card-desc">
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </div>
          </div>
        </div>
      </div>
      <div className="newsletter-section">
        <h2 className="newsletter-title">Subscribe now & get 20% off</h2>
        <p className="newsletter-desc">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="newsletter-input"
          />
          <button type="submit" className="newsletter-btn">
            SUBSCRIBE
          </button>
        </form>
        {subscribed && (
          <div className="newsletter-success">Thank you for subscribing!</div>
        )}
      </div>
    </div>
  );
};

export default About;
