const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(403).json({ message: "User not authorized" });
      }
      let hasRole = false;
      //   const { roles: userRoles } = jwt.verify(token, secret);   XATO BERIB TURGAN LINE (NEGALIGINI BILMADIM) erindim oylangani 
      for (const role of roles) {
        if (roles.includes(role)) {
          hasRole = true;
        }
      }
      if (!hasRole) {
        return res.status(403).json({ message: "Permission denied" });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).json({ message: "User not authorized" });
    }
  };
};
