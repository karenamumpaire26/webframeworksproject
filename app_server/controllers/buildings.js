
const request = require("request");
const apiOptions = {
  server: "http://localhost:3000"
};

if (process.env.NODE_ENV === "production") {
  apiOptions.server = "YOUR_RENDER_URL"; // keep as is for now
}


const homelist = function (req, res) {
  const path = "/api/buildings";

  const requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };

  request(requestOptions, (err, response, body) => {
    res.render("buildings-list", {
      title: "StudentInc – Campus Buildings",
      pageHeader: {
        title: "Campus Buildings",
        strapline: "Explore MTU buildings and student facilities."
      },
      buildings: body
    });
  });
};


const buildingInfo = (req, res) => {
  const buildingId = req.params.buildingid;

  const path = `/api/buildings/${buildingId}`;

  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    rejectUnauthorized: false
  };

  request(requestOptions, (err, response, body) => {
    if (response && response.statusCode === 200) {
      res.render('building-info', { 
        building: body,
        title: body.name 
      });
    } else {
      res.render('error', { message: 'Building not found' });
    }
  });
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
