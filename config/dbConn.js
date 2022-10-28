const mongoose = require("mongoose");

/**
 * Opens Mongoose's default connection to MongoDB
 * */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
