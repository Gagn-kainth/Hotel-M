const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    enum: ["chef", "waiter", "manager", "receptionist"],
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// ✅ async with NO next parameter
personSchema.pre("save", async function () {
  const person = this;

  if (!person.isModified("password")) return; // ✅ plain return, no next()

  const salt = await bcrypt.genSalt(10);
  person.password = await bcrypt.hash(person.password, salt);
  // ✅ no next() — Mongoose awaits the Promise automatically
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password); // ✅ throws on error naturally
};

const Person = mongoose.model("Person", personSchema);

module.exports = Person;