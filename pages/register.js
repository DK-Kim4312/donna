// pages/register.js
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Error from '../components/Error'
import { registerUser } from '../features/auth/authActions'

import React from 'react';
import '../styles/NoBodyMargin.scss';
import styles from '../styles/Register.module.css';
import { authenticateWithGoogle } from '../lib/googleAuth';
import { DonnaIcon } from '../styles/DonnaIcon';
import { GoogleIcon } from '../styles/GoogleIcon';

export default function Register() {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const router = useRouter()

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) router.push('/login')
    // redirect authenticated user to profile screen
    if (userInfo) router.push('/profile')
  }, [router, userInfo, success])


  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      alert('Password mismatch')
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase()
    dispatch(registerUser(data))
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
      </div>


      <form onSubmit={handleSubmit(submitForm)} className={styles.loginform}>
        {error && <Error>{error}</Error>}
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
            {...register('firstName')}
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder='Last Name'
            className={styles['name-input']}
            required
            {...register('lastName')}
          />
        </div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder='Email'
          className={styles.input}
          required
          {...register('email')}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder='Password'
          className={styles.input}
          required
          {...register('password')}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder='Password'
          className={styles.input}
          required
          {...register('confirmPassword')}
        />

        <button type="submit" className={styles.widebutton} disabled={loading}>{loading ? 'Loading' : 'Create Account'}</button>
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
