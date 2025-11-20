const mongoose = require('mongoose');
const Building = mongoose.model('Building');

// HOMEPAGE — LIST ALL BUILDINGS
const homelist = async function (req, res) {
  try {
    const buildings = await Building.find().lean();

    res.render('buildings-list', {
      title: 'MTU Campus Buildings',
      pageHeader: {
        title: 'StudentInc',
        strapline: 'Explore MTU buildings and student facilities'
      },
      buildings
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Database error loading buildings");
  }
};


// SINGLE BUILDING PAGE
const buildingInfo = async function (req, res) {
  try {
    // TEMPORARY STATIC DETAILS
    const buildingsData = {
      "An Cuan": {
        name: "An Cuan",
        address: "North Campus",
        rating: 4,
        description: "A social and study building for MTU students.",
        facilities: ["Common room", "Student kitchen", "Study pods"],
        openingHours: ["Mon-Fri: 8am-9pm", "Sat: 9am-5pm", "Sun: Closed"]
      },
      "KSA Building": {
        name: "KSA Building",
        address: "South Campus",
        rating: 5,
        description: "Home to the School of Science & IT.",
        facilities: ["IT Labs", "Lecture halls", "Printing"],
        openingHours: ["Mon-Fri: 8am-10pm", "Sat: 10am-4pm"]
      },
      "BIT Building": {
        name: "BIT Building",
        address: "North Campus",
        rating: 3,
        description: "Business & Information Technology building.",
        facilities: ["Classrooms", "Study spaces"],
        openingHours: ["Mon-Fri: 9am-5pm"]
      }
    };

    const building = buildingsData[req.params.id];

    if (!building) {
      return res.status(404).send("Building not found");
    }

    res.render('buildings-info', {
      title: building.name,
      building
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error loading building details");
  }
};


// ADD REVIEW PAGE
const addReview = function (req, res) {
  res.render('buildings-review-form', {
    title: 'Add Review'
  });
};


module.exports = {
  homelist,
  buildingInfo,
  addReview
};
