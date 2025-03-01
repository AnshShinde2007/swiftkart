const express = require("express");
const router = express.Router();
const Product = require("../models/productmodel");

// Get all products
router.get("/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a product
router.post("/", async (req, res) => {
  try {
      console.log("Received data:", req.body); // 🟢 Debugging line
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
      console.error("ye problem hai", error);
      res.status(500).json({ message: error.message });
  }
});


// Update a product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
