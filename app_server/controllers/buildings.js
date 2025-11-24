const request = require("request");
const apiOptions = {
  server: "http://localhost:3000"
};

if (process.env.NODE_ENV === "production") {
  apiOptions.server = "YOUR_RENDER_URL";
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



const buildingInfo = function (req, res) {
  const path = `/api/buildings/${req.params.id}`;

  const requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };

  request(requestOptions, (err, response, body) => {
    if (response && response.statusCode === 200) {
      res.render("buildings-info", {
        title: body.name,
        building: body
      });
    } else {
      res.status(response.statusCode).render("error", {
        message: "Building not found",
        error: body
      });
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
  buildingList: homelist // this matches your route /buildings
};
