/**
 * 
 * 11. Problem: Express Authentication Middleware

Problem Statement: Implement an authentication middleware for an Express application. The middleware should check for the presence of a valid JWT (JSON Web Token) in the request headers. If a valid token is present, allow the request to proceed; otherwise, return a 401 Unauthorized status.

Function Signature:

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 

  Expected Output:
  
  If a valid JWT is present, allow the request to proceed.
  If no JWT is present or it's invalid, return a 401 Unauthorized status.
  Test Cases:
  
  Request with a valid JWT should proceed.
  Request without a JWT or with an invalid JWT should return a 401 Unauthorized status.
 */

// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

const express = require("express");
const app = express();
const PORT = 3000;
const jwt = require("jsonwebtoken");
const secretKey = "secret_key";

function authenticationMiddleware(req, res, next) {
  // Your implementation here
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid Token.");
  }
}

app.get("/protected", (req, res) => {
  res.send("Welcome to the protected route");
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "john.doe",
  };

  const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });

  res.header("Authorization", token).send(user);
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
