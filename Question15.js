const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
function loggingMiddleware(req, res, next) {
  // Your implementation here
  console.log("Timestamp:", new Date().toUTCString());
  console.log("HTTP Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
}

app.use(loggingMiddleware);

app.get("/timestamp", (req, res) => {
  const data = "data in console";
  res.send(data);
  let resparam = req.params;
  res.json(resparam);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
