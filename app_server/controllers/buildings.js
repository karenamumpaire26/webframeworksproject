
const request = require("request");
const apiOptions = {
  server: "http://localhost:3000"
};

if (process.env.NODE_ENV === "production") {
  apiOptions.server = "YOUR_RENDER_URL"; // keep as is for now
}


const homelist = async (req, res) => {
  try {
    const response = await fetch(`${apiOptions.server}/api/buildings`);
    const body = await response.json();

    res.render("buildings-list", {
      title: "StudentInc – Campus Buildings",
      pageHeader: {
        title: "Campus Buildings",
        strapline: "Explore MTU buildings and student facilities."
      },
      buildings: body
    });
  } catch (err) {
    res.render("error", { message: "Unable to load buildings" });
  }
};



const buildingInfo = async (req, res) => {
  const buildingId = req.params.buildingid;

  try {
    const response = await fetch(`${apiOptions.server}/api/buildings/${buildingId}`);
    const body = await response.json();

    if (response.ok) {
      res.render('building-info', { 
        building: body,
        title: body.name 
      });
    } else {
      res.render('error', { message: 'Building not found' });
    }
  } catch (err) {
    res.render('error', { message: 'Building not found' });
  }
};


const addReview = function (req, res) {
  res.render("buildings-review-form", {
    title: "Add Review"
  });
};

module.exports = {
  homelist,
  buildingInfo,
  addReview,
  buildingList: homelist // optional alias
};
