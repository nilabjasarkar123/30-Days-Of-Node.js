/**
 * 
 * 12. Problem: Express Rate Limiting

Problem Statement: Implement a rate-limiting middleware for an Express application. The middleware should limit the number of requests from a single IP address to a specified rate, and return a 429 Too Many Requests status if the limit is exceeded.

Function Signature:

/**
 * Rate-limiting middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function


  
  If the number of requests from a single IP is below the limit, allow the request to proceed.
  If the limit is exceeded, return a 429 Too Many Requests status.
  Test Cases:
  
  Send requests within the limit; all should proceed.
  Send requests exceeding the limit; some should return a 429 status.
 */

const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

function rateLimitMiddleware(req, res, next) {
  // Your implementation here
  limiter(req, res, next);
}

const limiter = rateLimit({
  max: 2,
  windowMs: 60 * 1000,
  message: "Too many request from this IP",
});

app.get("/day12", rateLimitMiddleware, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from  nilabja's express server",
  });
});

//app.use(limiter);
app.use(rateLimitMiddleware);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
