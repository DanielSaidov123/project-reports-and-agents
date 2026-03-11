import { useAuthStore } from "../store/useAuthStore"

export default function Logout() {
  const {logout}=useAuthStore()
  return (
    <div>
        <button className="login-button" onClick={ logout}>logout</button>
    </div>
  )
}
