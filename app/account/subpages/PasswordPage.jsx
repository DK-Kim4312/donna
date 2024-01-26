import React from 'react';
import AuthView from '../../../components/AuthView';

export default function PasswordPage() {
    return (
        <div>
            <h1>Change Password</h1>
            <AuthView view='update_password' />
        </div>
    )
}