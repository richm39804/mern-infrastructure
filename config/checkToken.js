const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  let token = req.get('Authorization') || req.query.token;
  req.user = null;
  if (!token) return next();
  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return next();
    req.user = decoded.user;
    // Optional - we are interested in the expiration
    req.exp = new Date(decoded.exp * 1000);
    return next();
  });
};