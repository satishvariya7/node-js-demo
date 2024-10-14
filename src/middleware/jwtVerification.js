const jwt = require("jsonwebtoken");

const jwtVerification = (req, res, next) => {
  const headers = req.headers.authorization;
  if (headers) {
    const token = headers.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.SECRETE_KEY, (err) => {
        if (err) {
          next({ message: "Token not valid!" });
        } else next();
      });
    } else next({ message: "Token not valid!" });
  } else next({ message: "Can not get access without send authorization!" });
};

module.exports = jwtVerification; 