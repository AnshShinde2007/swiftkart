import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { Card, Modal, Button } from "react-bootstrap";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get("/api/products");
        setProducts(productResponse.data);
        setFilteredProducts(productResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.product._id === product._id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterProducts(term, "");
  };

  const filterProducts = (searchTerm, category) => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid flex-wrap gap-3 justify-content-between">
          <h1 className="navbar-brand fs-3">Swift Kart</h1>

          {/* Category Links */}
          <div className="d-flex flex-wrap gap-2">
            <Link to="/electronics" className="btn btn-link text-muted">
              Electronics
            </Link>
            <Link to="/groceries" className="btn btn-link text-muted">
              Groceries
            </Link>
            <Link to="/daily" className="btn btn-link text-muted">
              Daily Use Items
            </Link>
          </div>

          {/* Search and Cart */}
          <div className="d-flex flex-grow-1 flex-md-grow-0 align-items-center gap-3">
            <div className="position-relative w-100" style={{ maxWidth: "300px" }}>
              <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <button className="btn position-relative" onClick={() => setShowCart(true)}>
              <FiShoppingCart className="text-muted fs-4" />
              {cart.length > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="container mt-5 pt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredProducts.map((product) => (
            <div className="col" key={product._id}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
                <Card.Body className="text-center d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="fs-5">{product.name}</Card.Title>
                    <Card.Text className="text-muted">₹{product.price}</Card.Text>
                  </div>
                  <button className="btn btn-success mt-auto w-100" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      <Modal show={showCart} onHide={() => setShowCart(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.product._id} className="d-flex justify-content-between mb-3">
                  <div>
                    <p className="mb-1 fw-semibold">{item.product.name}</p>
                    <p className="text-muted small mb-0">₹{item.product.price}</p>
                  </div>
                  <div>
                    <p className="mb-1">Qty: {item.quantity}</p>
                    <p className="text-muted small mb-0">₹{item.product.price * item.quantity}</p>
                  </div>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <h5>Total:</h5>
                <h5>₹{calculateTotal()}</h5>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCart(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => alert("Proceeding to checkout")}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">&copy; 2025 Swift Kart - All rights reserved</p>
      </footer>
    </div>
  );
};

export default Home;
