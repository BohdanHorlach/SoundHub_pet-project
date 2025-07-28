module.exports = class UserDTO {
    userId;
    username;

    constructor(model){
        this.userId = model.id;
        this.username = model.username;
    }
}