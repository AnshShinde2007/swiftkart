import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { Card, CardContent } from "../components/ui/card";

const products = [
  { id: 1, name: "Bananas", price: "₹40/kg", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Milk", price: "₹60/L", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Bread", price: "₹30", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Eggs", price: "₹120/dozen", image: "https://via.placeholder.com/150" },
];

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white p-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">Blinkit</h1>
        <div className="flex items-center gap-4">
          <FiSearch className="text-xl" />
          <FiShoppingCart className="text-xl" />
        </div>
      </nav>

      {/* Content */}
      <div className="p-4 flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-2">Categories</h2>
          <ul className="space-y-2">
            <li className="hover:text-green-600 cursor-pointer">Fruits & Vegetables</li>
            <li className="hover:text-green-600 cursor-pointer">Dairy & Bakery</li>
            <li className="hover:text-green-600 cursor-pointer">Snacks & Beverages</li>
            <li className="hover:text-green-600 cursor-pointer">Household Needs</li>
          </ul>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-3/4 p-4">
          {products.map((product) => (
            <Card key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
                <button className="mt-2 bg-green-500 text-white px-4 py-1 rounded">Add</button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
