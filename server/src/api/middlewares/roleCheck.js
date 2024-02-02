const { authenticate } = require('./auth'); 

const roleCheck = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ message: "User not authenticated" });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Insufficient permissions" });
  }

  next();
};

module.exports = { roleCheck };
