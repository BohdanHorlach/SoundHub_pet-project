const { BadRequest } = require("../exceptions/api-errors");
const User = require("../models/user-model");

module.exports = class UserDTO {
    id;
    name;
    avatar;
    role;

    constructor(arg1, name, avatar, role) {
        if (arg1 instanceof User) {
            this.id = arg1.id;
            this.name = arg1.name;
            this.avatar = arg1.avatar;
            this.role = arg1.role;
        } else if (typeof arg1 === "string" && name && role) {
            this.id = arg1;
            this.name = name;
            this.avatar = avatar;
            this.role = role;
        } else {
            throw BadRequest("Invalid arguments for UserDTO");
        }
    }
}