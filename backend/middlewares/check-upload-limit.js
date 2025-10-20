const { MusicCard } = require("../models");
const { BadRequest, ForbiddenError } = require("../exceptions/api-errors");
const Roles = require("../enums/roles");

const MAX_UPLOADS_FOR_USERS = 3;


module.exports = async function checkUploadLimit(req, res, next) {
  try {
    const user = req.user;
    if (!user) {
      return next(ForbiddenError("Unauthorized: user not found in request"));
    }

    if (user.role === Roles.ADMIN) {
      return next();
    }

    const uploadCount = await MusicCard.count({ where: { authorId: user.id } });

    if (uploadCount >= MAX_UPLOADS_FOR_USERS) {
      return next(BadRequest(`Upload limit reached (${MAX_UPLOADS_FOR_USERS} files allowed).`, ['Upload limit reached']));
    }

    next();
  } catch (err) {
    return next(err);
  }
};
