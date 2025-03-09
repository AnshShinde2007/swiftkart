import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProducts, createProduct as createProductAPI } from "../api/products";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageUrl: ""
  });

  useEffect(() => {
    getProducts()
      .then((data) => {
        console.log("API Response:", data);
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const updateStock = (id, newStock) => {
    axios
      .put(`${API_URL}/${id}`, { stock: newStock })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? { ...product, stock: newStock } : product
          )
        );
      })
      .catch((error) => console.error("Error updating stock:", error));
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await createProductAPI(newProduct);
      console.log("Created product response:", response);
      if (response && response._id) {
        setProducts((prevProducts) => [...prevProducts, response]);
        setNewProduct({ name: "", description: "", price: "", category: "", stock: "", imageUrl: "" });
      } else {
        console.error("Product creation failed, response:", response);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Admin Dashboard</h1>

      <div className="mb-4">
        <h2>Add New Product</h2>
        <form onSubmit={createProduct} className="d-flex flex-column gap-2">
          <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="form-control" required />
          <input type="text" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="form-control" required />
          <input type="number" placeholder="Price (₹)" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="form-control" required />
          <input type="text" placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="form-control" required />
          <input type="number" placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="form-control" required />
          <input type="text" placeholder="Image URL" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} className="form-control" required />
          <button type="submit" className="btn btn-success">Add Product</button>
        </form>
      </div>

      <div className="mb-4">
        <h2>Manage Products</h2>
        {products.length > 0 ? (
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price (₹)</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <input type="number" value={product.stock} onChange={(e) => updateStock(product._id, e.target.value)} className="form-control" style={{ width: "80px" }} />
                  </td>
                  <td>
                    <img src={product.imageUrl} alt={product.name} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products available. Start by adding a new product above.</p>
        )}
      </div>
    </div>
  );
}
