const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/connection');

dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(require('./routes/route'));

// Function to start the server
const startServer = async () => {
    try {
        const db = await connectDB(); // Await MongoDB connection
        if (!db) throw new Error("Database connection failed!");

        // Start the HTTP server only if the DB connection is successful
        app.listen(port, () => {
            console.log(`Server is running on port: http://localhost:${port}`);
        });

        // Handle server errors
        app.on('error', (err) => {
            console.error(`Failed to connect with HTTP Server: ${err}`);
        });
    } catch (error) {
        console.error(`Connection Failed...! ${error}`);
        process.exit(1); // Exit process on failure
    }
};

// Start the server
startServer();
