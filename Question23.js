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
    const categoryObject = await Category.findOne({ category });
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

addProduct();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// const mongoose = require("mongoose");
// const express = require("express");
// const router = express.Router();
// const app = express();

// // Define the Product schema
// const productSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   quantity: Number,
//   categoryAdded: [{ type: Schema.Types.ObjectId, ref: "Category" }],
// });

// const categorySchema = new mongoose.Schema({
//   category: String,
// });

// // Create a Mongoose model for the Product schema
// const Product = mongoose.model("Product", productSchema);
// const Category = mongoose.model("Category", categorySchema);

// async function connectToMongoDB() {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1/my-db", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connection successful");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error.message);
//   }
// }

// connectToMongoDB();

// async function ProductWithCategory(name, price, quantity, categoryAdded) {
//   try {
//     const newProduct = new Product({ name, price, quantity, categoryAdded });
//     return await newProduct.save();
//   } catch (error) {
//     throw new Error(`Error creating product: ${error.message}`);
//   }
// }

// async function createProduct(name, price, quantity) {
//   try {
//     const newProduct = new Product({ name, price, quantity });
//     return await newProduct.save();
//   } catch (error) {
//     throw new Error(`Error creating product: ${error.message}`);
//   }
// }

// /**
//  * Retrieves all products from MongoDB
//  * @returns {Promise} - Promise that resolves with an array of product objects
//  */
// async function getAllProducts() {
//   try {
//     return await Product.find();
//   } catch (error) {
//     throw new Error(`Error retrieving products: ${error.message}`);
//   }
// }

// /**
//  * Updates a product in MongoDB
//  * @param {string} productId - ID of the product to update
//  * @param {Object} updatedProduct - Updated product object
//  * @returns {Promise} - Promise that resolves with the updated product
//  */
// async function updateProduct(productId, updatedProduct) {
//   try {
//     return await Product.findByIdAndUpdate(productId, updatedProduct, {
//       new: true,
//     });
//   } catch (error) {
//     throw new Error(`Error updating product: ${error.message}`);
//   }
// }

// /**
//  * Deletes a product from MongoDB
//  * @param {string} productId - ID of the product to delete
//  * @returns {Promise} - Promise that resolves with the deleted product
//  */
// async function deleteProduct(productId) {
//   try {
//     return await Product.findByIdAndDelete(productId);
//   } catch (error) {
//     throw new Error(`Error deleting product: ${error.message}`);
//   }
// }

// // createProduct("mango", 5, 20);
// // createProduct("banana", 2, 10);
// //deleteProduct('65d7754d668c037c47033a7a')

// // module.exports = {
// //   createProduct,
// //   getAllProducts,
// //   updateProduct,
// //   deleteProduct
// // };
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
