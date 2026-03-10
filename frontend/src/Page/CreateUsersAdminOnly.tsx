import AddUsers from "../components/AddUsers";
import Navbar from "../components/Navbar.";

export default function CreateUsersAdminOnly() {
  return (
    <div>
      <Navbar/>
      <div className="NewReportsForm">
        <AddUsers/>
      </div>
    </div>
  )
}
