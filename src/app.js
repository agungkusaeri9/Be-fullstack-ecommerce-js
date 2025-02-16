const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
