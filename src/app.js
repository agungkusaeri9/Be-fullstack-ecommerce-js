const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
app.use(express.json());
app.use(cors());



app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
