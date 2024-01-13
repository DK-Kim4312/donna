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

  fetch(`${BACKEND_API_URL}/receive-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: session.access_token,
    }),
  }
  ).then((response) => {
    console.log("receive-token response", response)
  }).catch((error) => {
    console.log("error", error)
  })

  // fetch(`${BACKEND_API_URL}/list_events`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }
  // ).then((response) => {
  //   console.log("list_events response", response)
  // }).catch((error) => {
  //   console.log("error", error)
  // })

  // fetch(`${BACKEND_API_URL}/axios`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }
  // ).then((response) => {
  //   console.log("axios response", response)
  // }).catch((error) => {
  //   console.log("error", error)
  // })
};

