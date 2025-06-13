import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [admin, setAdmin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (admin === 'admin' && password === 'admin123') {
      alert('Welcome, Admin!');
      navigate('/admin');
    } else {
      alert('Unauthorized!');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleAdminLogin} style={styles.form}>
        <h2 style={styles.title}>🛡️ Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={admin}
          onChange={e => setAdmin(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Enter Admin</button>
      </form>
    </div>
  );
};

const styles = {
  ...UserLogin.defaultProps?.styles, // reuse if needed
  container: {
    background: '#111827',
    color: 'white',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Poppins', sans-serif",
  },
  form: {
    background: '#1f2937',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 0 30px rgba(0,0,0,0.6)',
    width: '90%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#60a5fa',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#374151',
    color: '#f3f4f6',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#6366f1',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default AdminLogin;
