import { useState } from "react";
import React from "react";
import { login } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useRequest } from "../Hooks/useRequest";

interface LoginCredentials {
  agentCode: string;
  password: string;
}
interface LoginResponse {
  data: {
    role: "agent" | "admin";
    id?: string;
  };
}
export default function LoginComponents() {
  const [input, setInput] = useState<LoginCredentials>({
    agentCode: "",
    password: "",
  });
  const { request, loading, error } = useRequest<LoginResponse>();
  const navigate = useNavigate();
  const { loginUser } = useAuthStore();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const data = await request(()=>login(input));
     if (!data || !data.data) return; 
    loginUser(data.data.role);

    if (data.data.role === "agent") {
      navigate("/HomeAgent");
    } else {
      navigate("/HomeAdmin");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-login">
      <h2>Sign In</h2>

      {error && (
        <p style={{ color: "#ff4d4d", fontSize: "14px", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      <div className="div-form-login">
        <input
          type="text"
          value={input.agentCode}
          onChange={(e) => setInput({ ...input, agentCode: e.target.value })}
          placeholder="Agent Code"
          required
        />
      </div>

      <div className="div-form-login">
        <input
          type="password"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          placeholder="Password"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "מתחבר..." : "כניסה"}
      </button>
    </form>
  );
}
