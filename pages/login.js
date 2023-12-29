// pages/login.js
import React from 'react';
import '../styles/NoBodyMargin.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Auth.module.css';
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
    <div className={styles.background}>
      <div className={styles.sidebar}>
      </div>
      <div className={styles.formcontainer}>
      </div>
    </div>


  );
}
