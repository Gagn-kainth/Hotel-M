const { generateToken } = require("../middleware/jwt");
const Person = require("../models/person");

async function HandleHotelHome(req, res) {
  res.send("Welcome to the Hotel M. How may I assist you?");
}

async function HandleProfile(req , res) {
  try{
      const userData=req.user;
      console.log("user Data ",userData)

      const userId = userData.id;
      const user = await Person.findById(userId);
      res.status(200).json({user});

  }catch(err){
    console.error(err);
    res.status(500).json({ error: "Invalid Server Error !!" });
 
  }
}














async function HandleLogins(req, res) {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Invalid Server Error !!" });
  }
}

async function HandleNewPerson(req, res) {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    await newPerson.save();

    const payload = {
      id: newPerson._id,
      username: newPerson.username,
    };
    const token = generateToken(payload);
    console.log("Token is:", token);

    res
      .status(201)
      .json({
        token: token,
        message: "Person added successfully",
        person: newPerson,
      });
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

    const updatedPerson = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("data updated");
    res.status(200).json(updatedPerson);
  } catch (error) {
    console.error("Error updating person:", error);
    res.status(500).json({ error: "An error occurred while updating person." });
  }
}
async function HandleDeletePerson(req, res) {
  try {
    const personId = req.params.id;

    const deletedPerson = await Person.findByIdAndDelete(personId);

    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    res
      .status(200)
      .json({ message: "Person deleted successfully", person: deletedPerson });
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ error: "An error occurred while deleting person." });
  }
}

module.exports = {
  HandleHotelHome,
  HandleNewPerson,
  HandleGetAllPersons,
  HandleGetPersonByWork,
  HandleUpdatePersonData,
  HandleDeletePerson,
  HandleLogins,
  HandleProfile,
};
