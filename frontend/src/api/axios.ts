import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

export const login = (data:object)=> API.post("/auth/login" , data)

export const createRports = (data:object) => API.post("/report/create/form" , data)

export const ChangePassword = (data:object)=> API.post("/auth/changePassword" , data)

export const createReportFromCSV = (data:object)=> API.post("/report/create/csv" , data) 

export const getRports = ()=> API.get("/report") 