import { FiSettings, FiUsers, FiBox, FiLogOut } from "react-icons/fi";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
            <FiUsers /> is working
          </li>
          <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
            <FiBox /> Products
          </li>
          <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
            <FiSettings /> Settings
          </li>
          <li className="flex items-center gap-2 text-red-500 hover:text-red-600 cursor-pointer mt-10">
            <FiLogOut /> Logout
          </li>
        </ul>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-bold">Total Users</h3>
            <p className="text-2xl text-green-600">1,245</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-bold">Total Orders</h3>
            <p className="text-2xl text-blue-600">3,567</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-bold">Revenue</h3>
            <p className="text-2xl text-purple-600">₹1,23,456</p>
          </div>
        </div>
      </main>
    </div>
  );
}
