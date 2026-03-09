import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

export const login = (data:object)=> API.post("/auth/login" , data)
