const staffService = require("../services/staffService");
const {role} = require("../scripts/role");
const { resolveSoa } = require("dns");

function create(req, res) {
  staffService.createStaff(req.body)
    .then(staff => res.status(201).json(staff))
    .catch(err => res.status(500).json({ message: err.message }));
}

function getAll(req, res) {

  staffService.getAllStaff()
    .then(data => res.json({data,roles:role}))
    .catch(err => res.status(500).json({ message: err.message }));
}

function update(req, res) {
  const { staffId } = req.params;
  staffService.updateStaff(staffId, req.body)
    .then(updated => res.json(updated))
    .catch(err => res.status(500).json({ message: err.message }));
}

function remove(req, res) {
  const { staffId } = req.params;
  staffService.deleteStaff(staffId)
    .then(() => res.json({ message: "Deleted" }))
    .catch(err => res.status(500).json({ message: err.message }));
}

module.exports = {
  create,
  getAll,
  update,
  remove,
};
