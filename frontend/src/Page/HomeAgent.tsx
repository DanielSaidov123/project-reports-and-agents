import HomeAgentComponents from "../components/HomeAgentComponents";
import Navbar from "../components/Navbar.";
import { useAuthStore } from "../store/useAuthStore";

export default function HomeAgent() {
  const { user } = useAuthStore();

  return (
    <div className="HomeAgent">
       <Navbar/>
      <h1>welcome to :{user?.role}</h1>
       <HomeAgentComponents/>
    </div>
  )
}
