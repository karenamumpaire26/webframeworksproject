const express = require('express');
const router = express.Router();
const ctrlAbout = require('../controllers/about');


const ctrlBuildings = require('../controllers/buildings');
const ctrlAuth = require('../controllers/auth');

router.get('/buildings', ctrlBuildings.buildingList);
router.get('/buildings/:id', ctrlBuildings.buildingReadOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/about', ctrlAbout.about);
module.exports = router;
