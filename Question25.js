const express = require('express');
const mongoose = require('mongoose');
const app = express();

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1/my-db', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});

// Schema Definition
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  // Add more fields as needed
});

// Model Creation
const Product = mongoose.model('Product', productSchema);

// Create index on the "name" field
function createProductNameIndex() {
    // Create the index on the "name" field
    Product.collection.createIndex({ "name": 1 }, (err) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index on 'name' field created successfully");
      }
    });
  }

// Express Routes
// Create a new product
app.post('/products', (req, res) => {
  const { name, description, price } = req.body;
  const product = new Product({ name, description, price });
  product.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Retrieve all products
app.get('/products', (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Update a product
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  Product.findByIdAndUpdate(id, { name, description, price }, { new: true })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: 'Product deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  // Create index on server startup
  await createProductNameIndex();
});
