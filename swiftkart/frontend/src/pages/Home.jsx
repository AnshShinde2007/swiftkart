/* eslint-disable react/prop-types */
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { Card, CardContent } from "../components/ui/card";
import "bootstrap/dist/css/bootstrap.min.css";

const products = [
  { id: 1, name: "Bananas", price: "₹40/kg", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Milk", price: "₹60/L", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Bread", price: "₹30", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Eggs", price: "₹120/dozen", image: "https://via.placeholder.com/150" },
];


const categories = ["Fruits & Vegetables", "Dairy & Bakery", "Snacks & Beverages", "Household Needs"];

// eslint-disable-next-line no-unused-vars
function Sidebar() {
  return (
    <div className="w-1/4 bg-white p-4 rounded-xl shadow">
      <h2 className="font-bold mb-2">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index} className="hover:text-green-600 cursor-pointer">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}



// eslint-disable-next-line no-unused-vars
function ProductCard({ product }) {
  return (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
      <CardContent className="p-4 text-center">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.price}</p>
        <button className="mt-2 bg-green-500 hover:bg-green-600 transition-all text-white px-4 py-1 rounded shadow-md">
          Add
        </button>
      </CardContent>
    </Card>
  );
}



export default function Home() {
  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm px-4">
        <h1 className="h4 fw-bold">Blinkit</h1>
        <div className="d-flex gap-3">
          <FiSearch size={20} />
          <FiShoppingCart size={20} />
        </div>
      </nav>

      {/* Content */}
      <div className="container py-4 d-flex">
        {/* Sidebar */}
        <div className="col-md-3 bg-white p-3 rounded shadow-sm">
          <h2 className="h6 fw-bold mb-2">Categories</h2>
          <ul className="list-unstyled">
            <li className="text-primary cursor-pointer fw-semibold py-1">Fruits & Vegetables</li>
            <li className="text-primary cursor-pointer fw-semibold py-1">Dairy & Bakery</li>
            <li className="text-primary cursor-pointer fw-semibold py-1">Snacks & Beverages</li>
            <li className="text-primary cursor-pointer fw-semibold py-1">Household Needs</li>
          </ul>
        </div>

        {/* Product Grid */}
        <div className="col-md-9 d-flex flex-wrap gap-3 p-3">
          {products.map((product) => (
            <Card key={product.id} className="card shadow-sm" style={{ width: "18rem" }}>
              <img src={product.image} alt={product.name} className="card-img-top" />
              <CardContent className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="text-muted">{product.price}</p>
                <button className="btn btn-success">Add</button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
