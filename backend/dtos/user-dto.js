const { BadRequest } = require("../exceptions/api-errors");
const User = require("../models/user-model");

module.exports = class UserDTO {
    userId;
    name;
    avatar;
    role;

    constructor(user){
        if (!(user instanceof User)) {
            throw BadRequest('Expected instance of User model');
        }

        this.userId = user.id;
        this.name = user.name;
        this.avatar = user.avatar;
        this.role = user.role;
    }
}