const Person = require("../models/Person");

async function HandleHotelHome(req, res) {
  res.send("Welcome to the Hotel M. How may I assist you?");
}

async function HandleNewPerson(req, res) {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    await newPerson.save();
    res
      .status(201)
      .json({ message: "Person added successfully", person: newPerson });
  } catch (error) {
    console.error("Error adding person:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the person." });
  }
}
async function HandleGetAllPersons(req, res) {
  try {
    const persons = await Person.find();
    console.log("Fetched persons:", persons);
    res.status(200).json(persons);
    } catch (error) {   
    console.error("Error fetching persons:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the persons." });
  } 
}

module.exports = {
  HandleHotelHome,
  HandleNewPerson,
HandleGetAllPersons,
};
