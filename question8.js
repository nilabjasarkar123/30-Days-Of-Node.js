const express = require('express');
const app = express();

function errorHandler(err, req, res, next) {
  res.status(400).json({ error: err.message });
}

function positiveIntegerHandler(req, res, next) {
    const { number } = req.query;
    if (Number.isInteger(parseInt(number)) && parseInt(number) > 0) {
      res.status(200).send("Success! The number is a positive integer.");
    } else {
      next(new Error("'number' must be a positive integer"));
    }
  }

app.get('/positive', positiveIntegerHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});













// /**
//  * Express route to handle requests with a positive integer parameter
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */

// const express = require('express');
// const app = express();

// function errorHandler (err, req, res, next) {
   
//     res.status(500)
//     res.render('error', { error: err })
//   }

// function positiveIntegerHandler(req, res) {
//     // Your implementation here
//     const { num } = parseInt(req.query);
//     if(num.isInteger(parseInt(num)) && parseInt(num) > 0){
//         res.status("number is posetive")
//     } else {
//         next(new Error("'number' must be a positive integer"));
//     }
//   }

//   app.get('/positive', positiveIntegerHandler);

// //   app.use((err, req, res, next) => {
// //     console.error(err.stack)
// //     res.status(500).send('Something broke!')
// //   })
//   app.use(errorHandler)
//  app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });