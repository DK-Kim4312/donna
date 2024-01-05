'use client'
import React from 'react';
import '../styles/NoBodyMargin.scss';
import Error from './Error'
import styles from '../styles/Login.module.css';
import { authenticateWithGoogle } from '../lib/googleAuth';
import { handleGoogleCallback } from '../lib/googleAuth';
import { GoogleIcon } from '../styles/GoogleIcon';
import { DonnaIcon } from '../styles/DonnaIcon';
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/dist/server/api-utils';


const Login = () => {
    const supabase = createClientComponentClient('https://kyysqwafkfklqqawdolp.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5eXNxd2Fma2ZrbHFxYXdkb2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzODM1ODIsImV4cCI6MjAxOTk1OTU4Mn0._s64NAhTTNRD4-s4pJWs7I-5pbtfuVHAHIecwjwKzGU');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function login() {
        const { error } = await supabase.auth.signInWithPassword({
            email: email.toLowerCase(),
            password: password,
        });

        if (error) {
            redirect('/error')
        } else {
            redirect('/auth/callback')
        }
    }

    // TODO: change for supabase
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

            <form onSubmit={login} className={styles.loginform}>
                <div className={styles['form-title']}>Welcome Back!</div>
                <div className={styles['form-subtitle']}>Log Into Donna AI</div>
                <input
                    type="email"
                    id="email"
                    className={styles.input}
                    required
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    className={styles.input}
                    required
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

                <button onClick={loginwithGoogle} className={styles.googlebutton}>
                    <GoogleIcon />
                    Sign in with Google
                </button>
            </form>
        </div>
    );
}

export default Login;