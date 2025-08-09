const { UnauthorizedError } = require('../exceptions/api-errors');

class UsersController {
  async getCurrentUser(req, res, next){
    if(!req.user)
      return next(UnauthorizedError());
      
    return res.status(200).json({ user: req.user });
  }
}

module.exports = new UsersController();