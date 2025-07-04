const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Не админ" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Недействительный токен" });
  }
}



module.exports = auth;
