'use client';
import { AuthProvider } from './providers/AuthProvider';
import { ContextProvider } from '../context/ContextProvider';

export default function Providers({ accessToken, children }) {
    return (
        <ContextProvider>
            <AuthProvider accessToken={accessToken}>
                {children}
            </AuthProvider>
        </ContextProvider>

    )
};
