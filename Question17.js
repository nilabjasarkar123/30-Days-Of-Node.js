const mongoose = require("mongoose");

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

//var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
  }
  //{ timestamps: true }
);

const user_details = mongoose.model("User", UserSchema);

async function addUserToDatabase(user) {
  const result = await user.save();

  console.log(result);
}

var user = new user_details({
  username: "simran",
  email: "sim@gmail.com",
});
addUserToDatabase(user);

connectToMongoDB();
