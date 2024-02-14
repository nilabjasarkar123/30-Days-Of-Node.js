/**
 * Caching middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * npm i http-cache-middleware

 */
const express = require("express");
const cache = require("memory-cache");

const app = express();
function cachingMiddleware(req, res, next) {
  const key = req.originalUrl;

  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    res.send(cachedResponse);
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      cache.put(key, body, 3000); // Cache expiration time in milliseconds (e.g. 5 minutes)
      res.sendResponse(body);
      // Set a timeout to remove the cached item after the expiration time
      setTimeout(() => {
        cache.del(key);
        console.log(`Cache for "${key}" has expired`);
      }, 3000); // Same duration as the cache expiration time
    };
    next();
  }
}

app.use(cachingMiddleware);

app.get("/data", (req, res) => {
  const data = "This is the cached response for /data";
  res.send(data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
