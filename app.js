const express = require('express');
const cors = require('cors');
const routes = require("./routes");
const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/auth");
const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', authRoutes);
app.use('/api', auth, routes);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
