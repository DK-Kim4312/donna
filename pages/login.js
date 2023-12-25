// pages/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Login.module.css';
import { authenticateWithGoogle } from '../lib/auth';

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
        <div className={styles.container}>
        <div className={styles['form-container']}>
          <h2 className={styles['form-title']}>Login</h2>
          <form onSubmit={handleLogin} className={styles['reset-margin-padding']}>
            <div className={styles['form-group']}>
              <label htmlFor="email" className={styles['form-label']}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={styles.input}
                required
                value={email.toLowerCase()}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="password" className={styles['form-label']}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={styles.input}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <button type="submit" className={styles.button}>
                Login
              </button>
            </div>
          </form>
          <div className={styles['form-group']}>
            <p className={styles['form-label']}>Don't have an account?</p>
            <Link href="/register">
              <button className={styles.button}>Register</button>
            </Link>
          </div>
          <div className={styles['form-group']}>
            <p className={styles['form-label']}>Login with your Google Account!</p>
            <button className={styles.button} onClick={authenticateWithGoogle}>Sign in with Google</button>
          </div>
        </div>
      </div>
    );
}
