const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
});

// Create a User model
const User = mongoose.model("User", UserSchema);

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1/my-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connection successful");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

// Define an Express route to retrieve all users
app.get("/users", async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();
    // Send JSON response with array of user objects
    res.json(users);
  } catch (error) {
    // Handle error
    console.error("Error retrieving users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
