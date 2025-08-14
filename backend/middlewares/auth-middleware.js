const anonymUser = require("../config/anonym-user");
const { UnauthorizedError, ForbiddenError } = require("../exceptions/api-errors");
const { authenticateUserByToken } = require("../services/auth-service");


const authMiddleware = (isOptional = false) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if ((!authHeader || !authHeader.startsWith("Bearer ")) && !isOptional) {
        return next(UnauthorizedError(["Unauthorized: No token provided"]));
      }
  
      const token = authHeader?.split(" ")[1];
      req.user = token ? await authenticateUserByToken(token) : anonymUser;
  
      console.log("User authenticated (HTTP):", req.user);
      next();
    } catch (error) {
      console.error("Auth error (HTTP):", error);
      next(UnauthorizedError(["Unauthorized: Invalid token"]));
    }
  }
}


/**
 * @param {string|string[]} allowedRoles - Allowed roles
 * @returns {function} Express middleware
 */
const roleMiddleware = (allowedRoles) => {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(ForbiddenError([`Forbidden: Required role(s): ${roles.join(", ")}`]));
    }

    next();
  };
};


module.exports = { authMiddleware, roleMiddleware };
