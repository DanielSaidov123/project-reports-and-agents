import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Page/Login";
import HomeAgent from "./Page/HomeAgent";
import HomeAdmin from "./Page/HomeAdmin";
import UploadFORM from "./Page/UploadFORM";
import ApplyPassword from "./Page/ApplyPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomeAgent" element={<HomeAgent />} />
        <Route path="/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/UploadFORM" element={<UploadFORM />} />
        <Route path="/ApplyPassword" element={<ApplyPassword />} />
      </Routes>
    </>
  );
}

export default App;
