module.exports = class ApiErrors extends Error {
    status;
    errors;

    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors;
    }


    static UnauthorizedError(){
        return new ApiErrors(401, `User not authorized`);
    }


    static BadRequest(message, error = []){
        return new ApiErrors(500, message, error);
    }
}