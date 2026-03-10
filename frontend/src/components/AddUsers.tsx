import React, { useState } from "react";
import { signup } from "../api/axios";
import axios from "axios";

export default function AddUsers() {
  
  const [adduser, setAdduser] = useState ({
    fullName: "",
    agentCode: "",
    password: "",
    role: "agent",
  });
  const [ loading, setloading] = useState(false)
  const [ errr, setErr] = useState<string | null>(null)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(adduser)
    try {
      setloading(true)
      setErr(null)
      await signup(adduser)

    } catch (err) {
      if(axios.isAxiosError(err)){
        console.log(err)
        const serverError =err.response?.data?.message ||"error"
        console.log(serverError)
        setErr(serverError)
      } else {
        setErr("Unexpected error");
      }

    }finally{
      setloading(false)
    }
  }
  return (
    <div>
      <h3>Add new Agent or Admin</h3>
      <form className="form-reports" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="fullName"
          required
          value={adduser.fullName}
          onChange={(e) => setAdduser({ ...adduser, fullName: e.target.value })}
        />
        <input
          type="text"
          placeholder="agentCode"
          required
          value={adduser.agentCode}
          onChange={(e) =>
            setAdduser({ ...adduser, agentCode: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="password"
          required
          value={adduser.password}
          onChange={(e) => setAdduser({ ...adduser, password: e.target.value })}
        />
        <select
        value={adduser.role}
          onChange={(e) => setAdduser({ ...adduser, role: e.target.value })}
        >
          <option value="agent">agent</option>
          <option value="admin">admin</option>
        </select>
        <button type="submit">Create:{loading?"loading...":""}</button>
      </form>
        {errr && <p className="error">{errr}</p>} 
    </div>
  );
}
