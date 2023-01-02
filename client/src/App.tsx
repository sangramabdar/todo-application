import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import SignUp from "./modules/signup/components/SignUp";
import Login from "./modules/login/components/Login";
import DashBoard from "./modules/dashboard/component/DashBoard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
