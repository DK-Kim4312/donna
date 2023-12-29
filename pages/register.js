// pages/register.js

import React from 'react';
import { useState } from 'react';
import '../styles/NoBodyMargin.scss';
import styles from '../styles/Auth.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
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
    <div className={styles.container}>
      <div className={styles['form-container']}>
        <h2 className={styles['form-title']}>Register</h2>
        <form onSubmit={handleSubmit} className={styles['reset-margin-padding']}>
          <div className={styles['form-group']}>
            <label htmlFor="name" className={styles['form-label']}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="email" className={styles['form-label']}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              required
              value={formData.email.toLowerCase()}
              onChange={handleChange}
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="password" className={styles['form-label']}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles['form-group']}>
            <button type="submit" className={styles.widebutton}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
