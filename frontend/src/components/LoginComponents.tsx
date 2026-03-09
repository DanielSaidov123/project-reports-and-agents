import { useState } from "react";
import React from "react";
import { login } from "../api/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

interface LoginCredentials {
  agentCode: string;
  password: string;
}

export default function LoginComponents() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 
  const [input, setInput] = useState<LoginCredentials>({
    agentCode: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); 
    setLoading(true);

    try {
      await login(input);
      
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverError = err.response?.data?.error || "פרטי התחברות שגויים";
        setError(serverError);
      } else {
        setError("שגיאה בלתי צפויה");
      }
      console.error("Login Error:", err);
    } finally {
      setLoading(false); 
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
