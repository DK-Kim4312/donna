// pages/login.js
import React from 'react';
import '../styles/NoBodyMargin.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../lib/redux/slices/auth/authActions'
import Error from '../components/Error'
import styles from '../styles/Login.module.css';
import { authenticateWithGoogle } from '../lib/googleAuth';
import { handleGoogleCallback } from '../lib/googleAuth';
import { GoogleIcon } from '../styles/GoogleIcon';
import { DonnaIcon } from '../styles/DonnaIcon';

export default function Login() {
  const { loading, userInfo, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const router = useRouter();

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate('/profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }

  const loginwithGoogle = async () => {
    await authenticateWithGoogle()
    await handleGoogleCallback()

    router.push('/profile')
  }

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

      <form onSubmit={handleSubmit(submitForm)} className={styles.loginform}>
        {error && <Error>{error}</Error>}
        <div className={styles['form-title']}>Welcome Back!</div>
        <div className={styles['form-subtitle']}>Log Into Donna AI</div>
        <input
          type="email"
          id="email"
          className={styles.input}
          required
          {...register('email')}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          className={styles.input}
          required
          {...register('password')}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.widebutton} disabled={loading}>
          {loading ? 'Loading' : 'Login'}
        </button>
        <div><span className={styles['redirect-line']}>Don’t have an account? </span><a href='/register' className={styles.redirect}>Create one here</a></div>
        <div className={styles.divider}>
          <div className={styles['divider-text']}>or sign in with</div>
        </div>

        <button onClick={loginwithGoogle} className={styles.googlebutton}>
          <GoogleIcon />
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
