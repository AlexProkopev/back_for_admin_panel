const Staff = require("../models/staff");
const bcrypt = require("bcryptjs");

async function createStaff(data) {
  const existing = await Staff.findOne({ userName: data.userName });
  if (existing) {
    throw new Error("UserName already exists");
  }
  const passwordHash = await bcrypt.hash(data.password, 10);

  const staffData = {
    ...data,
    passwordHash
  };
  delete staffData.password;

  const staff = await Staff.create(staffData);
  const staffObj = staff.toObject();
  delete staffObj.passwordHash;
  return staffObj;
}

function getAllStaff() {
  return Staff.find();
}

function updateStaff(id, data) {
  return Staff.findByIdAndUpdate(id, data, { new: true });
}

function deleteStaff(id) {
  return Staff.findByIdAndDelete(id);
}

module.exports = {
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
};
