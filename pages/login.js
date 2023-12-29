// pages/login.js
import React from 'react';
import '../styles/NoBodyMargin.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Login.module.css';
import { authenticateWithGoogle } from '../lib/auth';
import { GoogleIcon } from '../styles/GoogleIcon';
import { DonnaIcon } from '../styles/DonnaIcon';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  let registeredUsers = {};
  let userJSON = [ // Sample user data
    { email: 'user1@example.com', name: 'User 1', password: 'password1' },
    { email: 'user2@example.com', name: 'User 2', password: 'password2' },
  ];

  for (var i = 0; i < userJSON.length; i++) {
    registeredUsers[userJSON[i].email] = userJSON[i];
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (registeredUsers[email]) {
      if (registeredUsers[email].password == password) {
        console.log("login successful");
        router.push('/');
      }
      else {
        console.log("incorrect password");
      }
    } else {
      console.log("user not found");
    }
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

        <div className={styles['sidebar-subtitle']}>Focus On YOU</div>
      </div>

      <form onSubmit={handleLogin} className={styles.loginform}>
        <div className={styles['form-title']}>Welcome Back!</div>
        <div className={styles['form-subtitle']}>Log Into Donna AI</div>
        <input
          type="email"
          id="email"
          className={styles.input}
          required
          value={email.toLowerCase()}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          className={styles.input}
          required
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.widebutton}>
          Login
        </button>
        <div><span className={styles['redirect-line']}>Don’t have an account? </span><a href='/register' className={styles.redirect}>Create one here</a></div>
        <div className={styles.divider}>
          <div className={styles['divider-text']}>or sign in with</div>
        </div>

        <button onClick={authenticateWithGoogle} className={styles.googlebutton}>
          <GoogleIcon />
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
