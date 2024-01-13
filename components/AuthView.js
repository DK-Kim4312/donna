'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthView({ view }) {
    const supabase = createClientComponentClient()
    const originalUrl = window.location.origin
    var redirect = null


    if (view === "sign_in" || view == "sign_up" || view == "magic_link") {
        redirect = originalUrl+'/auth/callback'

    } else if (view == "update_password") {
        redirect = originalUrl+'/auth/callback'
    } else if (view == "reset_password") {
        redirect = originalUrl+'/auth/callback'
    }

    return (
        <Auth
            supabaseClient={supabase}
            view={view}
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: 'hsl(167.2 35.2% 49.6%)',
                            brandAccent: 'hsl(167.2 35.2% 49.6%)',
                        },
                    },
                },
            }}

            theme="system"
            showLinks={true}
            providers={['google']}
            redirectTo={redirect}
            providerScopes={{
                google: 'https://www.googleapis.com/auth/calendar.events.readonly',
              }}
        />

    );


}
