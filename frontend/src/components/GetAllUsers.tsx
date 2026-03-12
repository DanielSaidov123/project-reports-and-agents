import { useEffect, useState } from "react";
import { getRportsAdmin } from "../api/axios";
import axios from "axios";

type User = {
  _id: string;
  agentCode: string;
  fullName: string;
  SourceType: string;
  role:string
  createdAt: string;
};

export default function GetAllUsers() {
  const [  users,   setUsers ] =  useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [errr, setErrr] = useState<null | string>(null);
  useEffect(() => {
    const allreports = async () => {
      try {
        setLoading(true);
        setErrr(null);
        const data = await getRportsAdmin();
        setUsers(data.data);
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
  }, []);

  console.log(users);
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
          {users.map((user:User) => (
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
