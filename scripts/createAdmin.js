require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");

mongoose.connect(process.env.DB_URI)
  .then(async () => {
    const username = "admin";
    const password = "superSecret123";
    const role = "admin";
    const existing = await Admin.findOne({ username });
    if (existing) {
      return process.exit();
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, passwordHash, role });
    await admin.save();
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
