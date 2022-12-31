const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Initialize configuration
dotenv.config();
const port = process.env.SERVER_PORT || 3000;

const app = express();

// Set up MongoDB database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_PATH, {useNewUrlParser: true, useUnifiedTopology: true});


// Get the default connection
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error."));

// Define route handlers
app.get("/", (req: any, res: any) => {
    res.send("Hello world")
})

// Start the express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
} )