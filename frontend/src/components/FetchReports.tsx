import { useEffect } from "react";
import { getRports } from "../api/axios";
import { useAuthStore } from "../store/useAuthStore";

export default function FetchReports() {
  const { reports, setreports } = useAuthStore();
  useEffect(() => {
    const reportsAgent = async () => {
      const data = await getRports();
      setreports(data.data);
    };
    reportsAgent();
  }, [setreports]);
  console.log(reports);
  return (
    <div className="div-table">
      <table className="table">
        <thead>
          <tr className="col-table">
            <th>Id</th>
            <th>Category</th>
            <th>Urgency</th>
            <th>Message</th>
            <th>SourceType</th>
            <th>imagePath</th>
            <th>CreatedAt</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr className="col-table" key={report._id}>
              <td>{report._id}</td>
              <td>{report.category}</td>
              <td
                className={`${report.urgency === "high" ? "high" : ""} ${report.urgency === "medium" ? "medium" : ""}${report.urgency === "low" ? "low" : ""}`}
              >
                {report.urgency}
              </td>
              <td>{report.message}</td>
              <td>{report.sourceType}</td>
              <td>{report.imagePath}</td>
              <td>{report.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
