import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5000/api/products";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        console.log("Home Page API Response:", response.data); // Debugging
        setProducts(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Welcome to Our Store</h1>

      {products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={product.imageUrl} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text"><strong>Category:</strong> {product.category}</p>
                  <p className="card-text"><strong>Price:</strong> ₹{product.price}</p>
                  <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
                  <button className="btn btn-primary" disabled={product.stock <= 0}>
                    {product.stock > 0 ? "Buy Now" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available at the moment.</p>
      )}
    </div>
  );
}
