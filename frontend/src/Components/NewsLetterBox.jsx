import React, { useState } from 'react';
import './NewsLetterBox.css';

const NewsletterBox = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className='newsletterbox-container'>
      <p className='newsletterbox-title'>Subscribe now & get 20% off</p>
      <p className='newsletterbox-desc'>Subscribe to our newsletter to get the latest news and offers</p>
      <form className='newsletterbox-form' onSubmit={onSubmitHandler}>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='newsletterbox-input'
          required
        />
        <button type='submit' className='newsletterbox-btn'>Subscribe</button>
      </form>
      {submitted && <p className='newsletterbox-success'>Thank you for subscribing!</p>}
    </div>
  );
};

export default NewsletterBox;
