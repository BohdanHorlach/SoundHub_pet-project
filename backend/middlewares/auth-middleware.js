const { admin } = require("../config/firebase-config");
const UserDTO = require("../dtos/user-dto");
const { UnauthorizedError, ForbiddenError } = require("../exceptions/api-errors");
const User = require("../models/user-model");


const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(UnauthorizedError(["Unauthorized: No token provided"]));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    let user = await User.findOne({ where: { firebaseUid: uid } });

    if (!user) 
    {
      user = await User.create({ firebaseUid: uid, name: decodedToken.name || "Unnamed" });
    }

    req.user = new UserDTO(user);
    console.log('User authenticated: ', req.user, '\n');
    next();
  } catch (error) {
    console.error("Auth error:", error);
    next(UnauthorizedError(["Unauthorized: Invalide token"]));
  }
};


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
