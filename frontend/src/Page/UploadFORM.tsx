import Navbar from "../components/Navbar.";
import NewReports from "../components/NewReports";

export default function UploadFORM() {
  return (
    <div>
      <Navbar />
      <div  className="NewReportsForm">
        <h1>Agent Reporting Sistem</h1>
        <NewReports />
      </div>
    </div>
  );
}
