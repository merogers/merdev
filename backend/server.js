require("dotenv").config();

const port = process.env.PORT || 5000;
const name = process.env.NAME;

const express = require("express");

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const emailRoutes = require("./routes/emailRoutes");

// --- DB --- //

const { connectDB } = require("./config/db");
connectDB();

// --- Express, Listen, Parse --- //

const app = express();

app.listen(port, () => {
  console.log(`> ${name} Server listening on port: ${port}...`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("MERDEV Backend").end();
});

// --- Routes --- //

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/send", emailRoutes);
