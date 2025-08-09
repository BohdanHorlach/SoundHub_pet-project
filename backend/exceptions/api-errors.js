module.exports = class ApiErrors extends Error {
    status;
    errors;

    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors;
    }


    static UnauthorizedError(error = []){
        return new ApiErrors(401, "User not authorized", error);
    }


    static ForbiddenError(message){
        return new ApiErrors(403, message);
    }


    static BadRequest(message, error = []){
        return new ApiErrors(400, message, error);
    }

    
    static UnenspectedError(message){
        return new ApiErrors(500, message);
    }
}