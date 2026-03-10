import { useEffect, useState } from "react";
import { getRports } from "../api/axios";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";

export default function FetchReports() {
  const { reports, setreports } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [errr, setErrr] = useState<null | string>(null);
  useEffect(() => {
    const reportsAgent = async () => {
      try {
        setErrr(null);
        setLoading(true);
        const data = await getRports();
        setreports(data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const servererror = error.response?.data.error || "error";
          setErrr(servererror);
        }
      } finally {
        setLoading(false);
      }
    };
    reportsAgent();
  }, [setreports]);
  console.log(reports);
  return (
    <div className="div-table">
      {loading && <p>Loading reports...</p>}
      {errr && <p className="error">{errr}</p>}
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
              <td className={report.urgency.toLowerCase()}>{report.urgency}</td>
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
