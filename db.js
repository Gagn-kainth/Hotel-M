const mongoose = require("mongoose");
require("dotenv").config();

 const mongoURL = "mongodb://localhost:27017/Hotel_M";
//const mongoURL = "process.env.mongoURL";

mongoose
  .connect(process.env.mongoURL, {
    tls: true,
    tlsAllowInvalidCertificates: true,
  })
  .then(() => console.log("MongoDB Connected "))
  .catch((err) => console.error("Connection failed ", err));

const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB connection successful");
});

db.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB connection disconnected");
});

module.exports = db;
