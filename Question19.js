const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Define the user schema with email validation
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        // Simple email validation using regex
        return /\S+@\S+\.\S+/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
});

// Create a Mongoose model using the schema
const User = mongoose.model("User", userSchema);

mongoose
  .connect("mongodb://127.0.0.1/my-db", {
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

async function addUserWithValidation(user) {
  try {
    // Create a new user instance using the model constructor and the provided user object
    const newUser = new User(user);

    // Attempt to save the user to the database using promises
    await newUser.save();
    console.log("User successfully added to the database");
  } catch (error) {
    // Handle validation errors and log an error message
    console.error(error.message);
  }
}

addUserWithValidation({ username: "john_doe", email: "invlid email" });
