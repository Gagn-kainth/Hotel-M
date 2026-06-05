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
async function HandleGetPersonByWork(req, res) {
  try {
    const workType = req.params.workType;
    const validWorkTypes = Person.schema.path("work").enumValues; //it automatically pulls this array from your schema: So if you ever add/remove a work type in Person.js, this function updates automatically — no need to touch it

    if (!validWorkTypes.includes(workType)) {
      return res.status(400).json({
        error: `Invalid work type. Must be one of: ${validWorkTypes.join(
          ", "
        )}`,
      });
    }
    const persons = await Person.find({ work: workType });
    res.status(200).json(persons);
  } catch (error) {
    console.error("Error fetching persons by work:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching persons." });
  }
}


async function HandleUpdatePersonData(req, res) {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;

    const updatedPerson = await Person.findByIdAndUpdate(personId, updatePersonData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('data updated');
    res.status(200).json(updatedPerson);

  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ error: 'An error occurred while updating person.' });
  }
}
async function HandleDeletePerson(req, res) {
  try {
    const personId = req.params.id;

    const deletedPerson = await Person.findByIdAndDelete(personId);

    if (!deletedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.status(200).json({ message: 'Person deleted successfully', person: deletedPerson });

  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'An error occurred while deleting person.' });
  }
}


module.exports = {
  HandleHotelHome,
  HandleNewPerson,
  HandleGetAllPersons,
  HandleGetPersonByWork,
  HandleUpdatePersonData,
  HandleDeletePerson
};
