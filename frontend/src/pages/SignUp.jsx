import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add sign up logic here
    alert('Sign up submitted!');
  };

  return (
    <div className="login-bg" style={{ minHeight: '100vh', background: '#f6f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 500 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400, fontSize: '2rem', textAlign: 'center', marginBottom: '2.5rem', letterSpacing: '0.01em' }}>
          Sign Up <span style={{ fontWeight: 100, fontSize: '1.5rem' }}>—</span>
        </h2>
        <form className="login-form" onSubmit={handleSubmit} style={{ gap: '1.5rem', width: '100%' }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="login-input"
            style={{ border: '1px solid #222', borderRadius: 0, fontFamily: 'inherit', fontSize: '1.1rem', background: 'transparent', padding: '1.2rem', marginBottom: 0 }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="login-input"
            style={{ border: '1px solid #222', borderRadius: 0, fontFamily: 'inherit', fontSize: '1.1rem', background: 'transparent', padding: '1.2rem', marginBottom: 0 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="login-input"
            style={{ border: '1px solid #222', borderRadius: 0, fontFamily: 'inherit', fontSize: '1.1rem', background: 'transparent', padding: '1.2rem', marginBottom: 0 }}
          />
          <button type="submit" style={{ marginTop: '2rem', width: '100%', background: '#222', color: '#fff', border: 'none', borderRadius: 0, padding: '1.1rem 0', fontFamily: 'inherit', fontSize: '1.15rem', fontWeight: 400, letterSpacing: '0.01em', cursor: 'pointer', transition: 'background 0.2s' }}>
            Sign Up
          </button>
        </form>
        <div className="login-footer" style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '1.1rem', color: '#888' }}>
          <span>Already have an account?</span>
          <Link to="/login" className="login-link" style={{ color: '#222', fontWeight: 500, marginLeft: 6 }}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 