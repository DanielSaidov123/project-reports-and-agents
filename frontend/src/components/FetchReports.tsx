import React, { useEffect, useState } from "react";
import axios from "axios";
import { getRportByID, getRportsfilter } from "../api/axios";
type Report = {
  _id: string;
  category: string;
  urgency: string;
  message: string;
  sourceType: string;
  imagePath: string | null;
  createdAt: string;
};
export default function FetchReports() {
  const [form, serForm] = useState({
    category: "",
    urgency: "",
    agentCode: "",
  });
  const [getById, setById] = useState<string>("");
  const [reportID, setReportID] = useState<Report | null>(null);
  const [reports, setreports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errr, setErrr] = useState<null | string>(null);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setErrr(null);
      const filter = {
        ...(form.category && { category: form.category }),
        ...(form.agentCode && { agentCode: form.agentCode }),
        ...(form.urgency && { urgency: form.urgency }),
      };
      if (getById !== "") {
        const data = await getRportByID(getById.trim());
        console.log(data.data);
        setReportID(data.data);
      } else {
        if (getById === "") setReportID(null);
        console.log(form);
        console.log(filter);
        const data = await getRportsfilter(filter);
        setreports(data.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const servererror = error.response?.data?.error;
        console.log(error);
        setErrr(servererror);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    try {
      setLoading(true);
      setErrr(null);
      const filterdata = async () => {
        const data = await getRportsfilter({});
        setreports(data.data);
      };
      filterdata();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const servererror = error.response?.data?.error;
        setErrr(servererror);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="div-table">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter category"
          value={form.category}
          onChange={(e) => serForm({ ...form, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="enter agentCode"
          value={form.agentCode}
          onChange={(e) => serForm({ ...form, agentCode: e.target.value })}
        />
        <input
          type="text"
          placeholder="Serch by Id"
          value={getById}
          onChange={(e) => setById(e.target.value)}
        />
        <select
          value={form.urgency}
          onChange={(e) => serForm({ ...form, urgency: e.target.value })}
        >
          <option value="">All</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <button type="submit">SELECT</button>
      </form>
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
          {!reportID ? (
            reports.map((report) => (
              <tr className="col-table" key={report._id}>
                <td>{report._id}</td>
                <td>{report.category}</td>
                <td className={report.urgency}>{report.urgency}</td>
                <td>{report.message}</td>
                <td>{report.sourceType}</td>
                <td>{report.imagePath}</td>
                <td>{report.createdAt}</td>
              </tr>
            ))
          ) : (
            <tr className="col-table" key={reportID._id}>
              <td>{reportID._id}</td>
              <td>{reportID.category}</td>
              <td className={reportID.urgency}>{reportID.urgency}</td>
              <td>{reportID.message}</td>
              <td>{reportID.sourceType}</td>
              <td>{reportID.imagePath}</td>
              <td>{reportID.createdAt}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
