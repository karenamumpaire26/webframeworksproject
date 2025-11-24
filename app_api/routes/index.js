const express = require('express');
const router = express.Router();

const ctrlBuildings = require('../controllers/buildings');
const ctrlAuth = require('../controllers/auth');


router.get('/buildings', ctrlBuildings.buildingList);
router.get('/buildings/:id', ctrlBuildings.buildingReadOne);
router.post('/buildings', ctrlBuildings.buildingCreate);
router.put('/buildings/:id', ctrlBuildings.buildingUpdate);
router.delete('/buildings/:id', ctrlBuildings.buildingDelete);


router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;
