const express = require('express');
const { jwtAuthMiddleware } = require("../middleware/jwt");
const router = express.Router();
const { 
    HandleNewPerson,
    HandleGetAllPersons,
    HandleGetPersonByWork,
    HandleUpdatePersonData,
    HandleDeletePerson,
    HandleHotelHome,
    HandleLogins,
    HandleProfile,
} = require('../controllers/person');

router.get('/profile',jwtAuthMiddleware,HandleProfile)
router.post('/login',HandleLogins)
router.get('/',HandleHotelHome)
router.get('/all',jwtAuthMiddleware, HandleGetAllPersons);
router.get('/:workType',jwtAuthMiddleware, HandleGetPersonByWork);
router.post('/signup', HandleNewPerson);
router.put('/:id',HandleUpdatePersonData);
router.delete('/:id', HandleDeletePerson);

module.exports = router;