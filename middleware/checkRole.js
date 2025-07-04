function checkRole(allowedRoles = []) {
  return function (req, res, next) {
    const user = req.admin;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }

    next();
  };
}

module.exports = checkRole;
