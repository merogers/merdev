const port = process.env.PORT || 5000;

const express = require("express");
const app = express();
require("dotenv").config();

const {errorHandler } = require('./middleware/errorHandler')

// --- DB --- //
const { connectDB } = require("./config/db");
connectDB();

// --- Route Imports --- //
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const emailRoutes = require("./routes/emailRoutes");

// --- JSON Parsing Middleware --- //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ! DO I NEED THIS?
app.get("/", (req, res) => {
  res.status(200).send("MERDEV Backend").end();
});

// --- Routes Paths --- //
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/send", emailRoutes);

// --- Error Handler --- //
app.use(errorHandler)

// --- Listener --- //
app.listen(port, () => {
  console.log(`> Server listening on port: ${port}...`);
});