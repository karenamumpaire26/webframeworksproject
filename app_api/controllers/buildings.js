const mongoose = require('mongoose');
const Building = mongoose.model('Building');

/* GET all buildings */
const buildingList = async (req, res) => {
  try {
    const buildings = await Building.find().lean();
    res.status(200).json(buildings);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* GET one building */
const buildingReadOne = async (req, res) => {
   if (req.params && req.params.id) {
    Building
      .findById(req.params.id)
      .then(building => {
        if (!building) {
          return res
            .status(404)
            .json({ message: "building id not found" });
        }
        res
          .status(200)
          .json(building);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "Error retrieving building", error: err });
      });
  } else {
    res
      .status(400)
      .json({ message: "No building id in request" });
  }


};

/* POST new building */
const buildingCreate = async (req, res) => {
  try {
    const newBuilding = await Building.create(req.body);
    res.status(201).json(newBuilding);
  } catch (err) {
    res.status(400).json(err);
  }
};

/* PUT update building */
const buildingUpdate = async (req, res) => {
  try {
    const updated = await Building.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Building not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json(err);
  }
};

/* DELETE building */
const buildingDelete = async (req, res) => {
  try {
    const deleted = await Building.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Building not found" });
    }
    res.status(204).json(null);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  buildingList,
  buildingReadOne,
  buildingCreate,
  buildingUpdate,
  buildingDelete
};
