import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import './App.css';
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/Notfound";
import 'bootstrap/dist/css/bootstrap.min.css';
import ElectronicsPage from "./pages/categories/Electronics";
import GroceriesPage from "./pages/categories/Groceries";
import DailyPage from "./pages/categories/Daily";
import PropTypes from 'prop-types';

// Function to check authentication status
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null; // Checks if the token exists
};

// Function to check if the user is an admin
const isAdmin = () => {
  const userRole = localStorage.getItem("role"); // Assuming the role is stored in localStorage
  return userRole === "admin"; // Only allow access if the role is 'admin'
};


// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/"/>;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

// Admin Protected Route Component
const AdminRoute = ({ element }) => {
  if (isAuthenticated() && isAdmin()) {
    return element;
  } else {
    alert("You do not have permission to access this page.");
    return <Navigate to="/" />;
  }
};

AdminRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
      <Route path="/electronics" element={<ProtectedRoute element={<ElectronicsPage />} />} />
      <Route path="/groceries" element={<ProtectedRoute element={<GroceriesPage />} />} />
      <Route path="/daily" element={<ProtectedRoute element={<DailyPage />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
