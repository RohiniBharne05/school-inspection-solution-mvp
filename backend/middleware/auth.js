const jwt = require('jsonwebtoken');
module.exports = (roles = []) => (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send('No token');
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (roles.length && !roles.includes(decoded.role)) return res.status(403).send('Forbidden');
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
};
