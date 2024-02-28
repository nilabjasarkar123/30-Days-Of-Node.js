const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 3000;
require("dotenv").config();

const payload = {
  userId: "123456",
  username: "exampleUser123",
  role: "admin",
  // other user-specific data
};

//const token = jwt.sign(payload, process.env.JWT_SECRET);

function authenticateAndAuthorize(roles) {
  return (req, res, next) => {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid authorization header" });
    }

    // const token = authorizationHeader.replace("Bearer ", "");
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization token not found" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check if the user has the required role
      if (roles && roles.length > 0 && !roles.includes(decoded.role)) {
        return res
          .status(403)
          .json({
            success: false,
            message: "Access forbidden for the user role",
          });
      }

      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };
}

// Usage of the middleware in routes
app.get("/admin", authenticateAndAuthorize(["admin"]), (req, res) => {
  // Handle admin-only functionality
  res.send("Admin Page");
});

app.get("/user", authenticateAndAuthorize(["user"]), (req, res) => {
  // Handle user-only functionality
  res.send("User Page");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// goto postman -> header->key and value : autherizarion and password