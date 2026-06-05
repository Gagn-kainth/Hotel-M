const Person = require('../models/person');

async function HandleHotelHome(req, res) {
    res.send('Welcome to the Hotel M. How may I assist you?');
}

async function HandleNewPerson(req, res) {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        await newPerson.save();
        res.status(201).json({ message: 'Person added successfully', person: newPerson });
    } catch (error) {
        console.error('Error adding person:', error);
        res.status(500).json({ error: 'An error occurred while adding the person.' });
    }
}

module.exports = {
    HandleHotelHome,
    HandleNewPerson
};