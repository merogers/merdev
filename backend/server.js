require("dotenv").config();
const path = require("path");

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;
const name = process.env.NAME;

const express = require("express");

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const emailRoutes = require("./routes/emailRoutes");

// --- DB --- //

const { connectDB } = require("./config/db");
const { response } = require("express");
connectDB();

// --- Express, Listen, Parse --- //

const app = express();

app.listen(port, () => {
  console.log(`> ${name} Server listening on port: ${port}...`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Serve frontend static files in production --- //

if (env === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));

  app.get("*"),
    function (req, res) {
      res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
    };
}

// --- Routes --- //

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/send", emailRoutes);
