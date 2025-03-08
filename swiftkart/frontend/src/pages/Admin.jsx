import { FiSettings, FiUsers, FiBox, FiLogOut } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminPage() {
  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside className="col-md-3 col-lg-2 bg-white shadow-sm p-4">
        <h2 className="h5 fw-bold mb-4">Admin Panel</h2>
        <ul className="list-unstyled">
          <li className="d-flex align-items-center gap-2 text-dark py-2 px-3 rounded hover-bg-light">
            <FiUsers /> Users
          </li>
          <li className="d-flex align-items-center gap-2 text-dark py-2 px-3 rounded hover-bg-light">
            <FiBox /> Products
          </li>
          <li className="d-flex align-items-center gap-2 text-dark py-2 px-3 rounded hover-bg-light">
            <FiSettings /> Settings
          </li>
          <li className="d-flex align-items-center gap-2 text-danger py-2 px-3 rounded hover-bg-danger-light mt-4">
            <FiLogOut /> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <h1 className="h4 fw-semibold">Dashboard</h1>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h3 className="h6 fw-bold">Total Users</h3>
              <p className="h4 text-success">1,245</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h3 className="h6 fw-bold">Total Orders</h3>
              <p className="h4 text-primary">3,567</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h3 className="h6 fw-bold">Revenue</h3>
              <p className="h4 text-purple">₹1,23,456</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
