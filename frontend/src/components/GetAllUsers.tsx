import { useEffect, useState } from "react";
import { getRportsAdmin } from "../api/axios";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";

export default function GetAllUsers() {
  const { setReportsAdmin, reportsAdmin } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [errr, setErrr] = useState<null | string>(null);
  useEffect(() => {
    const allreports = async () => {
      try {
        setLoading(true);
        setErrr(null);
        const data = await getRportsAdmin();
        setReportsAdmin(data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error.response?.data.error || "error";
          setErrr(serverError);
        }
      } finally {
        setLoading(false);
      }
    };
    allreports();
  }, [setReportsAdmin]);

  console.log(reportsAdmin);
  return (
    <div  className=" ">
      {loading && <p>loading...</p>}
      {errr && <p>{errr}</p>}
      <table  className="table">
        <thead>
          <tr className="col-table">
            <th>Id</th>
            <th>agentCode</th>
            <th>fullName</th>
            <th>SourceType</th>
            <th>CreatedAt</th>
          </tr>
        </thead>

        <tbody>
          {reportsAdmin.map((user) => (
            <tr className="col-table" key={user._id}>
              <td>{user._id}</td>
              <td>{user.agentCode}</td>
              <td>{user.fullName}</td>
              <td>{user.role}</td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
