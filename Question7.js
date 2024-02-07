/**
 * Express middleware to log incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */

const express = require('express')
const app = express()

function requestLoggerMiddleware(req, res, next) {
    // Your implementation here
    requestTime = new Date();
    requestMethod = req.method;
    console.log(`${requestTime}-${requestMethod} request received.`)
   
    next()
  }

app.use(requestLoggerMiddleware)


app.get('/', (req, res) => {
    //let responseText = ''
    //responseText += `<small>Requested at: ${req.Date.now()}-${req.method}</small>`
   // res.send(responseText)
})

app.listen(3005, () => {
    console.log('Server is running on port 3005');
});