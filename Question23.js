const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();

// Define the Category schema
const categorySchema = new mongoose.Schema({
  category: String,
});

// Create a Mongoose model for the Category schema
const Category = mongoose.model("Category", categorySchema);

// Define the Product schema with a reference to Category
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  categoryAdded: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Reference to Category
});

// Create a Mongoose model for the Product schema
const Product = mongoose.model("Product", productSchema);

async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/my-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

connectToMongoDB();

async function ProductWithCategory(name, price, quantity, categoryAdded) {
  try {
    const newProduct = new Product({ name, price, quantity, categoryAdded });
    return await newProduct.save();
  } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
}
async function createProduct(name, price, quantity, category) {
  try {
    // Find the category by name to get its ObjectId
    let categoryObject = await Category.findOne({ category });
    if (!categoryObject) {
      categoryObject = await Category.create({ category });
    }

    // Create the product with the category ObjectId
    const newProduct = new Product({
      name,
      price,
      quantity,
      categoryAdded: categoryObject,
    });

    return await newProduct.save();
  } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
}

async function getProductsPopulatedWithCategory() {
  try {
    return await Product.find().populate("categoryAdded"); // Populate the categoryAdded field
  } catch (error) {
    throw new Error(
      `Error retrieving products with populated category: ${error.message}`
    );
  }
}

async function addProduct() {
  try {
    await connectToMongoDB();
    const createdProduct = await createProduct("banana", 5, 20, "fruit");
    console.log("Product created:", createdProduct);
  } catch (error) {
    console.error("Error creating product:", error.message);
  } finally {
    mongoose.disconnect();
  }
}

// Create an index on the "name" field of the "Product" collection in MongoDB
function createProductNameIndex() {
  // Access the Mongoose Product model
  const Product = mongoose.model("Product");

  // Create the index on the "name" field
  Product.createIndexes({ "name": 1 }, (err) => {
    if (err) {
      console.error("Error creating index:", err);
    } else {
      console.log("Index on 'name' field created successfully");
    }
  });
}

// Call the createProductNameIndex function to create the index
createProductNameIndex();

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
