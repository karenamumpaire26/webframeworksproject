
const about = (req, res) => {
  res.status(200).json({
    title: "About StudentInc",
    content: "StudentInc helps MTU students explore campus buildings, find services, and navigate academic life."
  });
};

module.exports = { about };
