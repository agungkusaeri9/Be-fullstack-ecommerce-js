const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");
const cors = require("cors");
const path = require('path');

connectDB();

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes)
app.use("/api/products", productRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
