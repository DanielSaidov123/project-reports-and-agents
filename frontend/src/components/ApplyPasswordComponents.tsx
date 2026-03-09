import { useState } from "react";
import { ChangePassword } from "../api/axios";
import axios from "axios";

export default function ApplyPasswordComponents() {
  const [newPass, setNewPasswrd] = useState({
    oldPassword: "",
    newPassword: "",
  });
  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault()
    try {
       const data= await ChangePassword(newPass)
       console.log(data)
    } catch (err) {
        if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.error);
      }
    }
  }
  return (
    <div>
      <form className="Apply-Password" onSubmit={handleSubmit}>
        <input type="text" placeholder="oldPassword" onChange={(e)=>setNewPasswrd({...newPass , oldPassword: e.target.value})}/>
        <input type="password" placeholder="newPassword" onChange={(e)=>setNewPasswrd({...newPass , newPassword: e.target.value})}/>
        <button type="submit">החלף סיסמה</button>
      </form>
    </div>
  );
}
