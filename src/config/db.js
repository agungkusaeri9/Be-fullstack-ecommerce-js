const mongoose = require("mongoose");

const server = process.env.DB_SERVER;
const database = process.env.DB_NAME;

const connectDB = () => {
  mongoose
    .connect(`mongodb://${server}/${database}`)
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((err) => {
      console.error("Database connection failed:", err);
    });
};

module.exports = connectDB;
