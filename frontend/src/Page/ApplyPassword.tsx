import ApplyPasswordComponents from "../components/ApplyPasswordComponents";
import Navbar from "../components/Navbar.";

export default function ApplyPassword() {
  return (
    <div >
      <Navbar />
      
      <div   className="Apply-Password-pages">
            <h1>Apply password</h1>
            <ApplyPasswordComponents/>
      </div>

    </div>
  );
}
