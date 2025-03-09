import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import './App.css'
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/Notfound";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
