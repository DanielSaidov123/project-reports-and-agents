import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Page/Login";
import HomeAgent from "./Page/HomeAgent";
import HomeAdmin from "./Page/HomeAdmin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomeAgent" element={<HomeAgent />} />
        <Route path="/HomeAdmin" element={<HomeAdmin />} />
      </Routes>
    </>
  );
}

export default App;
