'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthView({view}) {
    const supabase = createClientComponentClient()
    var redirect = null

    if (view === "sign_in" || view == "sign_up" || view == "magic_link") {
        redirect = 'http://localhost:3000/auth/callback'
    } else if (view == "update_password") {
        redirect = 'http://localhost:3000/auth/callback'
    } else if (view == "reset_password") {
        redirect = 'http://localhost:3000/auth/callback'
    }

    return (
        <Auth
        supabaseClient={supabase}
        view={view}
        appearance={{ theme: ThemeSupa }}
        theme="system"
        showLinks={true}
        providers={[]}
        redirectTo={redirect}
    />
    );


}
