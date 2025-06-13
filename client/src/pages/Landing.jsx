import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>🌸 Welcome to <span style={styles.brand}>Clothora</span></h1>
        <p style={styles.subtitle}>Step into the world of stylish tees — Choose your portal!</p>
        <div style={styles.buttonGroup}>
          <Link to="/login" style={{ ...styles.button, ...styles.userButton }}>
            🎒 User Login
          </Link>
          <Link to="/admin-login" style={{ ...styles.button, ...styles.adminButton }}>
            🛡️ Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundImage: `url('https://i.pinimg.com/originals/f8/40/d8/f840d8cf2c03b31b70ef2c66cf40df87.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: "'Poppins', sans-serif",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '16px',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '500px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: '800',
    color: '#f43f5e',
    marginBottom: '10px',
    textShadow: '2px 2px #fff0f5',
  },
  brand: {
    color: '#3b82f6',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#4b5563',
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    border: '2px solid transparent',
  },
  userButton: {
    backgroundColor: '#f472b6',
    color: '#fff',
  },
  adminButton: {
    backgroundColor: '#6366f1',
    color: '#fff',
  },
};

export default Landing;
