const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Sample custom error class
class MyCustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// Error handling middleware
function errorHandler(err, req, res, next) {
    // Default status code and error message
    let statusCode = 500;
    let errorMessage = 'Internal Server Error';

    // Check if the error is a known type
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Handle JSON parsing error
        statusCode = 400;
        errorMessage = 'Invalid JSON';
    } else if (err instanceof MyCustomError) {
        // Handle custom error types
        statusCode = err.statusCode;
        errorMessage = err.message;
    }

    // Log the error for debugging purposes
    console.error(err);

    // Send error response to the client
    res.status(statusCode).json({ error: errorMessage });
}

// Example route with intentional error
app.get('/error', (req, res, next) => {
    try {
        throw new Error('Intentional error');
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
});

// Example route with custom error
app.get('/custom-error', (req, res, next) => {
    try {
        throw new MyCustomError('Custom error message', 400);
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
});

// Middleware to handle unknown routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Add error handling middleware to the application
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
