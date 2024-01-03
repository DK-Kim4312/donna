import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

function ProtectedRoute({ children }) {
  const { userInfo } = useSelector((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page if no user is found in redux store
    if (!userInfo) {
      router.push('/login')
    }
  }, [userInfo, router])

  if (!userInfo) {
    return (
      <div className='unauthorized'>
        <h1>Unauthorized</h1>
        <span>
          <a onClick={() => router.push('/login')}>Login</a> to gain access
        </span>
      </div>
    )
  }

  return <div>{children}</div> // Replace with your Outlet equivalent for Next.js
}

export default ProtectedRoute
