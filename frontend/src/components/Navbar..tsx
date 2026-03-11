import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Logout from "./Logout";

export default function Navbar() {
  const {user} = useAuthStore()
  return (
    <nav className="nav-agent">
      <h1>Agent reports</h1>
      <div>
        <NavLink  className="NavLink" to={user?.role==='admin'? '/HomeAdmin':'/HomeAgent'}> <button>Home:{user?.role}</button></NavLink>
        <NavLink className="NavLink" to='/UploadFORM'> <button>New reports</button></NavLink>
        <NavLink className="NavLink" to='/UploadCSV'> <button>csv Upload</button></NavLink>
        <NavLink className="NavLink" to='/ReportsMyAgent'> <button>my reports</button></NavLink>
        {user?.role==='admin'&&(<><NavLink className="NavLink" to='/AddUsers'> <button>Add Agent</button></NavLink>
        <NavLink className="NavLink" to='/AllUsers'> <button>All Users</button></NavLink> </>)}
        <NavLink className="NavLink" to='/'><Logout/></NavLink>
        

      </div>
    </nav>
  );
}
