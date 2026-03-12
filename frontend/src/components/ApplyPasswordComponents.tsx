import { useState } from "react";
import { ChangePassword } from "../api/axios";
import { useRequest } from "../Hooks/useRequest";

export default function ApplyPasswordComponents() {
  const [newPass, setNewPasswrd] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const { request, loading, error, success } = useRequest();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await request(() => ChangePassword(newPass));
  }
  return (
    <div>
      <form className="Apply-Password" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="oldPassword"
          onChange={(e) =>
            setNewPasswrd({ ...newPass, oldPassword: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="newPassword"
          onChange={(e) =>
            setNewPasswrd({ ...newPass, newPassword: e.target.value })
          }
        />
        <button type="submit">{loading?"loading":"החלף סיסמה"}</button>
        {error && <p>{error}</p>}
        {success && <p>הסיסמה התחלפה</p>}
      </form>
    </div>
  );
}
