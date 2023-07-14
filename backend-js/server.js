require("dotenv").config();

const port = process.env.PORT || 5000;

const express = require("express");

const app = express();
const cors = require("cors");
const pc = require("picocolors");
const morgan = require("morgan");

const { errorMiddleware } = require("./middleware/errorMiddleware");
const indexRoutes = require("./routes");

// --- DB --- //
const { connectDB } = require("./config/db");

connectDB();

// --- CORS - Allow from Client-Side Only --- //

app.use(cors());

// --- Log requests in development mode only --- //
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("tiny"));
}

// --- JSON Parsing Middleware --- //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Main Router --- //
app.use("/", indexRoutes);

// --- Error Handler --- //
app.use(errorMiddleware);

// --- 404 Catch --- //
app.use("*", (_req, res) => res.status(404).json({ message: "Endpoint not found" }));

// --- Listener --- //
app.listen(port, () => {
  console.info(pc.blue(`> Server listening on port: ${port}...`));
});
