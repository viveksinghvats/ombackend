require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes=require("./routes/category");
const productRoutes=require("./routes/product");
const orderRoutes=require("./routes/order");
const connectDB = require("./dbConnection");



//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes uses
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);


//PORT
const port = process.env.PORT || 8000;

connectDB();
//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
