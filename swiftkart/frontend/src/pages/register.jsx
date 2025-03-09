import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      // Redirect to login page after successful registration
      history.push("/");
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-dark">
      <div className="card shadow-lg p-5 w-100" style={{ maxWidth: "450px", borderRadius: "12px" }}>
        <h2 className="text-center text-white mb-4">Admin Panel - Create an Account</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-white">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter your full name"
              required
              style={{ borderRadius: "8px" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your email"
              required
              style={{ borderRadius: "8px" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your password"
              required
              style={{ borderRadius: "8px" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label text-white">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              placeholder="Confirm your password"
              required
              style={{ borderRadius: "8px" }}
            />
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}

          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={loading}
            style={{ borderRadius: "8px" }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-muted">
            Already have an account? 
            <a href="/" className="text-primary">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
