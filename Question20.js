const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

const UserSchema = new mongoose.Schema({
  username: String,
  age: Number,
});

const User = mongoose.model("User", UserSchema);

async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/age-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

async function addUserToDatabase(username, age) {
  const user = new User({ username, age });
  try {
    const result = await user.save();
    console.log(result);
  } catch (error) {
    console.error("Error adding user to the database:", error.message);
  }
}

async function averageAgeOfUsers(req, res) {
  try {
    const averageAge = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: "$age" }
        }
      }
    ]);

    if (averageAge.length === 0) {
      return res.status(404).json({ message: "No users found in the database" });
    }

    res.json({ averageAge: averageAge[0].averageAge });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Connect to MongoDB
connectToMongoDB();

// Add users to the database
addUserToDatabase("simran", 27);
addUserToDatabase("adarsh", 24);

// Define the route
router.get('/average-age', averageAgeOfUsers);

// Create an Express application
const app = express();

// Use the router for the /average-age route
app.use('/', router);

// Start the Express server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
