const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./src/routes/auth");
const productRoutes = require("./src/routes/product")

require("./src/db");

//middlewares
const middlewares = require("./src/utils/middlewares")
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));


//routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/", (req, res) => {
    return res
        .status(200)
        .json({ success: true, message: "Welcome to my shop API" });
});

app.use(middlewares.errorHandler)
module.exports = app;
