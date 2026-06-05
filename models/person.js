
const mongoose = require("mongoose");

// Define a schema for the person collection
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
    enum: [
      "chef",
      "waiter",
      "manager",
      "housekeeping",
      "receptionist",
      "security",
      "maintenance",
      "event coordinator",
      "cleaning staff",
      "accountant",
      "hr",
    ],
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  }

});

// Create a model from the schema
const Person = mongoose.model("Person", personSchema);

module.exports = Person;