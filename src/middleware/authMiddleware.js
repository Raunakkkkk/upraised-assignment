const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const auth = req.headers.authorization;
  // console.log(auth);
  
  if (!auth?.startsWith("Bearer "))
    return res.status(401).json({ error: "Missing token" });

  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
