// TEMPORARY hard-coded data
const buildingsData = [
  {
    id: "An Cuan",
    name: "An Cuan",
    address: "North Campus",
    rating: 4,
    facilities: ["Study rooms", "Common areas", "WiFi"]
  },
  {
    id: "KSA Building",
    name: "KSA Building",
    address: "South Campus",
    rating: 5,
    facilities: ["IT Labs", "Lecture halls", "Printing"]
  },
  {
    id: "BIT Building",
    name: "BIT Building",
    address: "North Campus",
    rating: 3,
    facilities: ["Classrooms", "Study spaces"]
  }
];

// GET all buildings
const buildingList = (req, res) => {
  res.status(200).json(buildingsData);
};

// GET one building
const buildingReadOne = (req, res) => {
  const building = buildingsData.find(b => b.id === req.params.id);

  if (!building) {
    return res.status(404).json({ message: "Building not found" });
  }

  res.status(200).json(building);
};

// POST new building
const buildingCreate = (req, res) => {
  buildingsData.push(req.body);
  res.status(201).json(req.body);
};

// UPDATE a building
const buildingUpdate = (req, res) => {
  const index = buildingsData.findIndex(b => b.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Building not found" });
  }

  buildingsData[index] = req.body;
  res.status(200).json(req.body);
};

// DELETE building
const buildingDelete = (req, res) => {
  const index = buildingsData.findIndex(b => b.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Building not found" });
  }

  buildingsData.splice(index, 1);
  res.status(204).json(null);
};

module.exports = {
  buildingList,
  buildingReadOne,
  buildingCreate,
  buildingUpdate,
  buildingDelete
};
