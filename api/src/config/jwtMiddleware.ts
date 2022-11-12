require("dotenv").config();
const JWKS_URI = process.env.JWKS_URI;
const JWT_ISSUER = process.env.JWT_ISSUER;
const JWT_AUDIENCE = process.env.JWT_AUDIENCE;
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 15,
    jwksUri: JWKS_URI,
  }),
  audience: JWT_AUDIENCE,
  issuer: JWT_ISSUER,
  algorithms: ["RS256"],
});

export default jwtCheck;
