import { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { Card } from "react-bootstrap"; // Import Bootstrap's Card component

const GroceriesPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    const fetchData = async () => {
      try {
        const productResponse = await axios.get("https://swiftkart-backend.onrender.com/api/products");
        // Filter products based on Groceries
        const filteredProducts = productResponse.data.filter(product => product.category === "Groceries");
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-light min-vh-100">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid">
          <h1 className="navbar-brand">Swift Kart</h1>
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Search for products..."
              />
            </div>
            <FiShoppingCart className="text-muted fs-4" />
          </div>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="container mt-5 pt-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {products.map((product) => (
            <div className="col" key={product._id}>
              <Card className="shadow-sm rounded-lg border-0">
                <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
                <Card.Body className="text-center">
                  <Card.Title className="fs-5">{product.name}</Card.Title>
                  <Card.Text className="text-muted">₹{product.price}</Card.Text>
                  <Card.Text className="text-muted">{product.category}</Card.Text>
                  <button className="btn btn-success w-100">Add to Cart</button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2025 Swift Kart - All rights reserved</p>
      </footer>

    </div>
  );
};

export default GroceriesPage;
