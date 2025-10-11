const { UnauthorizedError } = require('../exceptions/api-errors');
const userService = require('../services/user-service');


class UsersController {
  async getCurrentUser(req, res, next){
    if(!req.user)
      return next(UnauthorizedError());
      
    return res.status(200).json({ user: req.user });
  }


  async getUserData(req, res, next){
    try {
      const { id } = req.params;
      const userData = await userService.getUser(id);

      return res.status(200).json({ user: userData });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();