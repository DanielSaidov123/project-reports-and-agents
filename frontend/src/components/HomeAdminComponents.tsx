import { useNavigate } from "react-router-dom"

export default function HomeAdminComponents() {
    const navigate = useNavigate()
  return (
    <div>
      <div className="grid">
        <div className="div-grid" onClick={()=>navigate("/UploadFORM")}>
          <h1>+</h1>
          <h4>New Report</h4>
          <p>sybmit a new report</p>
        </div>
        <div className="div-grid" onClick={()=>navigate('/UploadCSV')}>
          <h1>CSV</h1>
          <h4>CSV Upload</h4>
          <p>Import reports from a csv file</p>
        </div>
        <div className="div-grid" onClick={()=>navigate('/ReportsMyAgent')}>
          <h1>#</h1>
          <h4>All Reports</h4>
          <p>View all reports you have submited</p>
        </div>
        <div className="div-grid" onClick={()=>navigate('/ApplyPassword')}>
          <h1>🗝️</h1>
          <h4>Change password</h4>
          <p>Change your primary password</p>
        </div>
        <div className="div-grid" onClick={()=>navigate('/AddUsers')}>
          <h1>+👨</h1>
          <h4>Add Agent or Admin</h4>
        </div>
        <div className="div-grid" onClick={()=>navigate('/AllUsers')}>
          <h1>All Users</h1>
          <h4>Get all agent and admin</h4>
        </div>
      </div>
    </div>
  )
}
