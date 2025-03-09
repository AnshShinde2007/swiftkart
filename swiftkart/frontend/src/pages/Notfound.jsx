
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white">
      <div className="text-center">
        <h1 style={{ fontSize: "6rem", fontWeight: "bold" }}>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you are looking for do not exist or has been moved.</p>
        <Link to="/" className="btn btn-primary mt-3" style={{ fontSize: "1.2rem", padding: "10px 20px" }}>
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
