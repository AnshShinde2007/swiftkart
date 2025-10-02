import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ImageKit from "imagekit-javascript";

const API_URL = "https://swiftkart-backend.onrender.com/api/products";

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
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const updateStock = (id, newStock) => {
    axios.put(`${API_URL}/${id}`, { stock: newStock })
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
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      // If imageUrl is already a URL, skip upload. If it's a File object, upload to ImageKit.
      let imageUrl = newProduct.imageUrl;
      if (newProduct.imageUrl instanceof File) {
        setUploading(true);
        // 1) Get ImageKit auth params from backend
        const authRes = await axios.get("/api/products/imagekit/auth");
        const { token, signature, expire, publicKey } = authRes.data;
        // 2) Initialize ImageKit client
        const ik = new ImageKit({ 
          urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
          publicKey: publicKey
        });
        // 3) Upload file
        const uploadRes = await ik.upload({
          file: newProduct.imageUrl,
          fileName: `${Date.now()}_${newProduct.name.replace(/\s+/g, "_")}.jpg`,
          token,
          signature,
          expire,
        });
        imageUrl = uploadRes.url;
        setUploading(false);
      }

      const response = await axios.post(API_URL, { ...newProduct, imageUrl });
      if (response && response.data) {
        setProducts((prevProducts) => [...prevProducts, response.data]);
        setNewProduct({ name: "", description: "", price: "", category: "", stock: "", imageUrl: "" });
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const response = await axios.put(`${API_URL}/${editingProduct._id}`, editingProduct);
      if (response && response.data) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProduct._id ? response.data : product
          )
        );
        setEditingProduct(null);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Admin Dashboard</h1>

      <div className="mb-4">
        <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={editingProduct ? updateProduct : createProduct} className="d-flex flex-column gap-2">
          <input type="text" placeholder="Name" value={editingProduct ? editingProduct.name : newProduct.name} onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })} className="form-control" required />
          <input type="text" placeholder="Description" value={editingProduct ? editingProduct.description : newProduct.description} onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, description: e.target.value }) : setNewProduct({ ...newProduct, description: e.target.value })} className="form-control" required />
          <input type="number" placeholder="Price (₹)" value={editingProduct ? editingProduct.price : newProduct.price} onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, price: e.target.value }) : setNewProduct({ ...newProduct, price: e.target.value })} className="form-control" required />
          <input type="text" placeholder="Category" value={editingProduct ? editingProduct.category : newProduct.category} onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, category: e.target.value }) : setNewProduct({ ...newProduct, category: e.target.value })} className="form-control" required />
          <input type="number" placeholder="Stock" value={editingProduct ? editingProduct.stock : newProduct.stock} onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, stock: e.target.value }) : setNewProduct({ ...newProduct, stock: e.target.value })} className="form-control" required />
          <div
            onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              const file = e.dataTransfer.files?.[0];
              if (!file) return;
              const objectUrl = URL.createObjectURL(file);
              setPreviewUrl(objectUrl);
              if (editingProduct) {
                setEditingProduct({ ...editingProduct, imageUrl: file });
              } else {
                setNewProduct({ ...newProduct, imageUrl: file });
              }
            }}
            className={`border rounded p-3 text-center ${dragActive ? 'bg-light' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <div className="mb-2">Drag & drop an image here, or click to choose</div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const objectUrl = URL.createObjectURL(file);
                setPreviewUrl(objectUrl);
                if (editingProduct) {
                  setEditingProduct({ ...editingProduct, imageUrl: file });
                } else {
                  setNewProduct({ ...newProduct, imageUrl: file });
                }
              }}
              className="form-control"
            />
            {previewUrl && (
              <div className="mt-2">
                <img src={previewUrl} alt="preview" style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'cover' }} />
              </div>
            )}
          </div>
          {uploading && <div className="text-muted small">Uploading image...</div>}
          <button type="submit" className="btn btn-success">{editingProduct ? "Update Product" : "Add Product"}</button>
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
                    <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingProduct(product)}>Edit</button>
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
