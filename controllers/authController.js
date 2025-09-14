const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/staff");
require("dotenv").config();

async function login(req, res) {
   const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: "Введите логин и пароль" });
  }

  const staff = await Staff.findOne({ userName });
  if (!staff) return res.status(401).json({ message: "Неверные данные" });

  const isMatch = await bcrypt.compare(password, staff.passwordHash);
  if (!isMatch) return res.status(401).json({ message: "Неверные данные" });

  const token = jwt.sign(
    { id: staff._id, role: staff.role },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "7d" }
  );

  res.json({
    token,
    id: staff._id,
    userName: staff.userName,
    role: staff.role,
  });
}

async function getCurrentUser(req, res) {
  try {
    const user = await Staff.findById(req.admin.id).select("-passwordHash");
    if (!user)
      return res.status(404).json({ message: "Пользователь не найден" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  login,
  getCurrentUser,
};
