import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function BackendTest() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log(session)

  const BACKEND_API_URL = "https://donna-backend.vercel.app";

  // fetch(`${BACKEND_API_URL}/receive-token`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: 
  //     JSON.stringify({
  //       token: session.provider_token
  //     })
  // }
  // ).then((response) => {
  //   console.log("receive-token response", response)
  // }).catch((error) => {
  //   console.log("error", error)
  // })

  fetch(`${BACKEND_API_URL}/calendar`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${session.provider_token}`
    },
  }
  ).then((response) => {
    console.log("calendar response", response)
  }).catch((error) => {
    console.log("error", error)
  })

};

