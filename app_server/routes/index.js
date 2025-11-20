const express = require('express');
const router = express.Router();
const ctrlBuildings = require('../controllers/buildings');
const ctrlOthers = require('../controllers/others');

router.get('/', ctrlBuildings.homelist);
router.get('/building/:id', ctrlBuildings.buildingInfo);
router.get('/building/:id/review/new', ctrlBuildings.addReview);

router.get('/about', ctrlOthers.about);
router.get('/register', ctrlOthers.register);
router.get('/login', ctrlOthers.login);

module.exports = router;
