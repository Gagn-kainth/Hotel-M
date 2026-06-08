const express = require('express');
const router = express.Router();
const { 
    HandleNewPerson,
    HandleGetAllPersons,
    HandleGetPersonByWork,
    HandleUpdatePersonData,
    HandleDeletePerson,
    HandleHotelHome,
} = require('../controllers/person');


router.get('/',HandleHotelHome)
router.get('/all', HandleGetAllPersons);
router.get('/:workType', HandleGetPersonByWork);
router.post('/', HandleNewPerson);
router.put('/:id', HandleUpdatePersonData);
router.delete('/:id', HandleDeletePerson);

module.exports = router;