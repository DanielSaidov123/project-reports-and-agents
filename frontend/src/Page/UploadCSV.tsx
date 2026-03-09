import Navbar from "../components/Navbar.";
import UpCSV from "../components/UpCSV";

export default function UploadCSV() {
  return (
    <div>
      <Navbar />
      <div className="csv-form">
        <h1>Upload a csv file</h1>
        <UpCSV />
      </div>
    </div>
  );
}
