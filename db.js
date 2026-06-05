const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/Hotel_M';

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connection successful');
});

db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB connection disconnected');
});

module.exports = db;