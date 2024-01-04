"use client"
import Error from '../components/Error'
import React from 'react';
import '../styles/NoBodyMargin.scss';
import styles from '../styles/Register.module.css';
import { authenticateWithGoogle } from '../lib/googleAuth';
import { DonnaIcon } from '../styles/DonnaIcon';
import { GoogleIcon } from '../styles/GoogleIcon';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Register() {
    const supabase = createClientComponentClient();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

    async function register() {
        if (password !== confirmPassword) {
            alert('Password mismatch') // TODO: add TOAST
        }
        const { error } = await supabase.auth.signUp({
            email: email.toLowerCase(),
            password: password,
        },
            {
                data: {
                    firstName: firstName,
                    lastName: lastName,
                },
            }
        );

        if (error) {
            return <Error />;
        }
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


            <form onSubmit={register} className={styles.loginform}>
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
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder='Last Name'
                        className={styles['name-input']}
                        required
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Email'
                    className={styles.input}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Password'
                    className={styles.input}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Password'
                    className={styles.input}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
