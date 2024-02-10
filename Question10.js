/*
*
*. Problem: Express Static Files

Problem Statement: Create an Express application that serves static files (e.g., HTML, CSS, images) from a "public" directory. Ensure that accessing the root ("/") returns the "index.html" file from the "public" directory.

Function Signature:

/**
 * Express application serving static files from the "public" directory
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
/*

  Expected Output: Accessing the root ("/") should return the content of "public/index.html".
  
  Test Cases:
  
  Request to / should return the content of "public/index.html".
  Request to /styles/style.css should return the content of "public/styles/style.css".
  */

    const express = require('express');
    const app = express();
    const path = require('path');
    const PORT = 3000;
 
    function staticFileServer(req, res) {
        // Your implementation here
        if(res === '/')
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        else {
            res.sendFile(path.join(__dirname, 'public', 'styles/style.css'));
        }
    }
    app.use(express.static(path.join(__dirname, 'public')))
    app.get('/', staticFileServer);

    app.listen(PORT, function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });