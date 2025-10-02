const express = require("express");
const router = express.Router();
const ImageKit = require("imagekit");

// ImageKit initialization (env vars must be set in backend .env)
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "public_T32Egmf7iEb7Bdt0vSjgNBp3x/s=",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "private_0jmXTPdnL1la9PlnGLqnq3Hvy3k=",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});
const Product = require("../models/productmodel");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();  // Corrected line
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a product
router.post("/", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { name, description, price, category, stock, imageUrl } = req.body;

    if (!name || !description || !price || !category || !stock || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: error.message });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ImageKit authentication endpoint
router.get("/imagekit/auth", async (req, res) => {
  try {
    const missing = [];
    if (!process.env.IMAGEKIT_PUBLIC_KEY) missing.push("IMAGEKIT_PUBLIC_KEY");
    if (!process.env.IMAGEKIT_PRIVATE_KEY) missing.push("IMAGEKIT_PRIVATE_KEY");
    if (!process.env.IMAGEKIT_URL_ENDPOINT) missing.push("IMAGEKIT_URL_ENDPOINT");

    if (missing.length > 0) {
      const message = `ImageKit env vars missing: ${missing.join(", ")}`;
      console.error(message);
      return res.status(500).json({ error: message });
    }

    const authenticationParameters = imagekit.getAuthenticationParameters();
    return res.json({
      ...authenticationParameters,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY
    });
  } catch (err) {
    console.error("ImageKit auth error:", err);
    return res.status(500).json({ error: err.message || "ImageKit auth failed" });
  }
});

module.exports = router;
 
