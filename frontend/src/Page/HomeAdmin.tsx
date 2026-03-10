import Navbar from "../components/Navbar.";
import { useAuthStore } from "../store/useAuthStore";

export default function HomeAdmin() {
  const { user } = useAuthStore();
  return (
    <div>
      <Navbar />
      <div>
        <h1>welcome to :{user?.role}</h1>
      </div>
    </div>
  );
}
