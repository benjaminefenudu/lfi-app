// Import Dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Other imports
const database = require("./config/database");
const userRoute = require("./src/api/routes/user");
const itemRoute = require("./src/api/routes/item");

// Fetch database, app listen
const app = express();
database.connectDatabase(app);

// Use middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Set test page
app.get("/", (req, res) => {
  res.send("<h1>LFI App Working...</h1>");
});

// Set base routes
app.use("/user", userRoute);
app.use("/item", itemRoute);
