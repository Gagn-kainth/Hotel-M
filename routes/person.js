const express = require('express');
const router = express.Router();
const { HandleHotelHome,
    HandleNewPerson, HandleGetAllPersons } = require('../controllers/person');


router.get('/', HandleHotelHome);
router.get('/person', HandleGetAllPersons);
router.post('/person', HandleNewPerson);

module.exports = router;