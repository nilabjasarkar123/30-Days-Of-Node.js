/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

const express = require('express');
const app = express();

function greetHandler(req, res) {
    const { name } = req.query;
    if (name) {
        res.send(`Hello, ${name}!`);
    } else {
        res.send('Hello, Guest!');
    }
  }

app.get('/greet', greetHandler);

app.listen(3005, () => {
    console.log('Server is running on port 3005');
});
