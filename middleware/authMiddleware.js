const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const jwtToken = req.headers.authorization?.split(" ")[1];
  if (!jwtToken) return res.status(401).json({ error: "Invalid JWT token" });

  try {
    const verification = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = verification;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

const authorizeSeller = (req, res, next) => {
  if (req.user.role !== "seller") return res.status(403).json({ error: "Access denied, only sellers allowed" });
  next();
};

module.exports = { authenticate, authorizeSeller };
