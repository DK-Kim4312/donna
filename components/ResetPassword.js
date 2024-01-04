'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import cn from 'classnames';
import Link from 'next/link';


const ResetPassword = () => {
    const supabase = createClientComponentClient();
    const [email, setEmail] = useState('');

    async function resetPassword() {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/update-password`,
        });
    }

    return (
        <div className="card">
            <h2 className="w-full text-center">Forgot Password</h2>
            <form onSubmit={resetPassword} className="column w-full">
                <label htmlFor="email">Email</label>
                <input
                    className="input"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="button-inverse w-full" type="submit">
                    Send Instructions
                </button>
            </form>
            <Link href="/login" className="link">
                Remember your password? Sign In.
            </Link>
        </div>

    );
};

export default ResetPassword;
