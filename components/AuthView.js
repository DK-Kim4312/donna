'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthView(props) {
    const supabase = createClientComponentClient()
    let redirect = null

    if (props.view === 'sign_in' || props.view === 'sign_up') {
        redirect = 'http://localhost:3000/auth/callback'
    } else if (props.view === 'update_password') {
        redirect = 'http://localhost:3000/auth/update-password'
    }
    return (
        <Auth
            supabaseClient={supabase}
            view={props.view}
            appearance={{ theme: ThemeSupa }}
            theme="system"
            showLinks={false}
            providers={[]}
            redirectTo={redirect}
        />
    );
}
