const express = require('express');
const router = express.Router();
const ctrlBuildings = require('../controllers/buildings');

// GET all buildings
router.get('/buildings', ctrlBuildings.buildingList);

// GET one building
router.get('/buildings/:id', ctrlBuildings.buildingReadOne);

// POST new building
router.post('/buildings', ctrlBuildings.buildingCreate);

// PUT update building
router.put('/buildings/:id', ctrlBuildings.buildingUpdate);

// DELETE building
router.delete('/buildings/:id', ctrlBuildings.buildingDelete);

module.exports = router;
