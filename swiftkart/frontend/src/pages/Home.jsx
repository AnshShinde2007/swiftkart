import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { Card, Modal, Button } from "react-bootstrap"; 


const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products based on search
  const [cart, setCart] = useState([]); // Cart state to store cart items
  const [showCart, setShowCart] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    // Fetch products from the backend
    const fetchData = async () => {
      try {
        const productResponse = await axios.get("http://localhost:5000/api/products");
        setProducts(productResponse.data);
        setFilteredProducts(productResponse.data); // Initially show all products
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Function to handle adding a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.product._id === product._id);
      if (existingProduct) {
        // If product already exists, increase quantity
        return prevCart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it's a new product, add it to the cart
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  // Function to calculate the total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterProducts(term, ""); // Filter products based on search term and selected category
  };

  // Filter products based on search and category
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
  
    //navbar
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid">
        <h1 className="navbar-brand">Swift Kart</h1>
        <div className="d-flex align-items-center gap-3">
        <div className="d-flex gap-3">
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
            <div className="position-relative">
              <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearch} // Handle search input change
              />
            </div>

            {/* Cart Icon */}
            <button className="btn" onClick={() => setShowCart(true)}>
              <FiShoppingCart className="text-muted fs-4" />
              {cart.length > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle badge rounded-pill">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="container mt-5 pt-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {filteredProducts.map((product) => (
            <div className="col" key={product._id}>
              <Card className="shadow-sm rounded-lg border-0">
                <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
                <Card.Body className="text-center">
                  <Card.Title className="fs-5">{product.name}</Card.Title>
                  <Card.Text className="text-muted">₹{product.price}</Card.Text>
                  <button className="btn btn-success w-100" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      <Modal show={showCart} onHide={() => setShowCart(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.product._id} className="d-flex justify-content-between mb-3">
                  <div>
                    <p>{item.product.name}</p>
                    <p className="text-muted">₹{item.product.price}</p>
                  </div>
                  <div>
                    <p>Qty: {item.quantity}</p>
                    <p className="text-muted">₹{item.product.price * item.quantity}</p>
                  </div>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <h5>Total: ₹{calculateTotal()}</h5>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCart(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => alert('Proceeding to checkout')}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2025 Swift Kart - All rights reserved</p>
      </footer>
    </div>
  );
};

export default Home;
