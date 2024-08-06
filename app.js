const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./src/routes/auth");

require("./src/db");

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

/*
app.use("/api/", (req, res) => {
    return res
        .status(200)
        .json({ success: true, message: "Welcome to my shop API" });
});
*/

//routes
app.use("/api/auth", authRoutes);

module.exports = app;
