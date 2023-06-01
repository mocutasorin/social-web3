import express from "express";
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

import userRoutes from "./routes/user.routes";

// Initialize configuration
dotenv.config();
const port = process.env.SERVER_PORT || 8080;

const app = express();

// Parse JSON bodies
app.use(express.json());
// Parse URL encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

// Set up MongoDB database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_CONNECT_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error."));

// Define route handlers
app.get("/", (req: any, res: any) => {
  res.send("Hello world");
});

app.use("/users", userRoutes);

// Start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
