const multer = require("multer");
const ApiError = require("../exceptions/api-errors");

module.exports = function(err, req, res, next){
    console.log(err);

    if(err instanceof ApiError){
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    else if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({message: "Error not defined", errors: err.errors})
}