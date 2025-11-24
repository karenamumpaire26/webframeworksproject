const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://karen:karen123@cluster0.czyz7de.mongodb.net/StudentInc?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI)
  .then(() => console.log("Mongoose connected to StudentInc DB"))
  .catch(err => console.log("Mongoose connection error:", err));

// LOAD MODELS
require('./buildings');
require('./user');
