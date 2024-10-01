import { userAuthStore } from "../../store/authUser"

const HomeScreen = () => {
  const { logout } = userAuthStore();
  return (
    <div>HomeScreen
      <button onClick={ logout}>Logout</button>
    </div>
  )
}

export default HomeScreen