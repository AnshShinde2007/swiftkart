import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("https://swiftkart-backend.onrender.com/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token); // Store JWT token
      if (typeof response.data.role === 'string') {
        localStorage.setItem("role", response.data.role);
      } else if (typeof response.data.isAdmin === 'boolean') {
        localStorage.setItem("role", response.data.isAdmin ? "admin" : "user");
      }
      navigate("/home"); // Navigate to the home page
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-muted">
            Do not have an account? 
            <a href="/register" className="text-primary">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
