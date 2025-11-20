const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://karen:kakuba@cluster0.czyz7de.mongodb.net/?appName=Cluster0';

mongoose.connect(dbURI)
  .then(() => console.log("Mongoose connected to StudentInc DB"))
  .catch(err => console.log("Mongoose connection error:", err));

require('./buildings');
