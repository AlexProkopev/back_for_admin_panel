const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
require("dotenv").config();

function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Введите логин и пароль" });
  }

  Admin.findOne({ username }).then((admin) => {
    if (!admin) {
      return res.status(401).json({ message: "Неверные данные" });
    }

    bcrypt.compare(password, admin.passwordHash).then((isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ message: "Неверные данные" });
      }

      const token = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.JWT_SECRET || "secretkey",
        { expiresIn: "7d" }
      );

      res.json({
        token,
        id: admin._id,
        username: admin.username,
        role: admin.role,
      });
    });
  });
}

async function getCurrentUser(req, res) {
  try {
    const user = await Admin.findById(req.admin.id).select("-passwordHash");
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
