
const express = require('express');
const router = express.Router();

const ctrlOthers = require('../controllers/others');
const ctrlBuildings = require('../controllers/buildings');


router.get('/', ctrlBuildings.homelist);
router.get('/building/:id', ctrlBuildings.buildingInfo);
router.get('/about', ctrlOthers.about);

router
  .route('/register')
  .get(ctrlOthers.register)
  .post(ctrlOthers.register);

router
  .route('/login')
  .get(ctrlOthers.login);

module.exports = router;
