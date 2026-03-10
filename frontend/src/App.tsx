import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Page/Login";
import HomeAgent from "./Page/HomeAgent";
import HomeAdmin from "./Page/HomeAdmin";
import UploadFORM from "./Page/UploadFORM";
import ApplyPassword from "./Page/ApplyPassword";
import ProtectedRoute from "./components/ProtectedRoute"
import UploadCSV from "./Page/UploadCSV";
import ReportsMyAgent from "./Page/ReportsMyAgent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route  element={<ProtectedRoute allowedRoles={["agent"] } />}>
        <Route path="/HomeAgent" element={<HomeAgent />} />
        <Route path="/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/UploadFORM" element={<UploadFORM />} />
        <Route path="/UploadCSV" element={<UploadCSV />} />
        <Route path="/ApplyPassword" element={<ApplyPassword />} />
        <Route path="/ReportsMyAgent" element={<ReportsMyAgent />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
