const express = require('express');
const router = express.Router();
const{ HandleHotelHome,
    HandleNewPerson}=require('../controllers/url');


router.get('/',HandleHotelHome);
  
  router.post('/person', HandleNewPerson);

module.exports = router;