import { useNavigate } from "react-router-dom";

export default function HomeAgentComponents() {
    
    const navigate = useNavigate()
    return (
    <>
      <div className="grid">
        <div className="div-grid" onClick={()=>navigate("/UploadFORM")}>
          <h1>+</h1>
          <h4>New Report</h4>
          <p>sybmit a new report</p>
        </div>
        <div className="div-grid">
          <h1>CSV</h1>
          <h4>CSV Upload</h4>
          <p>Import reports from a csv file</p>
        </div>
        <div className="div-grid">
          <h1>#</h1>
          <h4>My Reports</h4>
          <p>View all reports you have submited</p>
        </div>
      </div>
    </>
  );
}
