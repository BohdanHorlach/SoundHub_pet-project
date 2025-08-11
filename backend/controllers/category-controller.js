const categoryService = require("../services/category-service");

class CategoryController {
  async getAll(req, res, next){
    try {
      const data = await categoryService.getAll();
      return res.status(200).json(data);
    }
    catch{
      console.error(error);
      return next(error);
    }
  }
}

module.exports = new CategoryController();
