const UserDTO = require("../dtos/user-dto");
const { BadRequest } = require("../exceptions/api-errors");
const User = require("../models/user-model");


class UserService {
  async getUser(id){
    const user = await User.findByPk(id);

    if(user === null)
      throw BadRequest("User not found");

    return new UserDTO(user);
  }
}


module.exports = new UserService();