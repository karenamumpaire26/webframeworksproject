
const express = require('express');
const router = express.Router();

const ctrlOthers = require('../controllers/others');
const ctrlBuildings = require('../controllers/buildings');


router.get('/', ctrlBuildings.homelist);
router.get('/about', ctrlOthers.about);

// Register page
router
  .route('/register')
  .get(ctrlOthers.register)
  .post(ctrlOthers.register);

// Login page
router
  .route('/login')
  .get(ctrlOthers.login)
  .post(ctrlOthers.login);




module.exports = router;
