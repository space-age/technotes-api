const jwt = require("jsonwebtoken");

/**
 * An implementation of JSON Web Tokens.
 * Check if the headers has authorization or Authorization (for either capital or lower case),
 * if doesnt contain "Bearer" then return status code 401.
 * Creates a token by splitting Bearer from the headers. Then compares the token with the access token secret.
 * Then, sets the user and roles if no errors

 */
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
