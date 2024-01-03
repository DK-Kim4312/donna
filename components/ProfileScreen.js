import { useSelector } from 'react-redux'

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.user)

  return (
    <div>
      <figure>{userInfo?.firstName.charAt(0).toUpperCase()}</figure>
      <span>
        Welcome <strong>{userInfo?.firstName}!</strong> You can view this page
        because you're logged in
      </span>
    </div>
  )
}
export default ProfileScreen