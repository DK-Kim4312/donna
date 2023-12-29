// pages/register.js

import React from 'react';
import { useState } from 'react';
import '../styles/NoBodyMargin.scss';
import styles from '../styles/Register.module.css';
import { authenticateWithGoogle } from '../lib/auth';
import { DonnaIcon } from '../styles/DonnaIcon';
import { GoogleIcon } from '../styles/GoogleIcon';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const storeUserInfo = async (userData) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.status === 200) {
      alert('Registration successful!');
    } else {
      alert('Registration failed.');
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    storeUserInfo(formData);
  };

  return (
    <div className={styles.background}>
      <div className={styles.sidebar}>
        <div className={styles['logo-title']}>
          <div className={styles['logo']}>
            <DonnaIcon />
          </div>
          <div className={styles['sidebar-title']}>Donna AI</div>
        </div>
      </div>


      <form onSubmit={handleSubmit} className={styles.loginform}>
        <div className={styles['form-title']}>Try Donna Today!</div>
        <div className={styles['form-subtitle']}>Create an Account</div>
        <div className={styles['name-input-container']}>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder='First Name'
            className={styles['name-input']}
            required
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder='Last Name'
            className={styles['name-input']}
            required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder='Email'
          className={styles.input}
          required
          value={formData.email.toLowerCase()}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder='Password'
          className={styles.input}
          required
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" className={styles.widebutton}>Create Account</button>
        <div><span className={styles['redirect-line']}>Already have an account? </span><a href='/login' className={styles.redirect}>Login</a></div>
        <div className={styles.divider}>
          <div className={styles['divider-text']}>or sign up with</div>
        </div>

        <button onClick={authenticateWithGoogle} className={styles.googlebutton}>
          <GoogleIcon />
          Sign in with Google
        </button>
      </form>

    </div >


  );
}
