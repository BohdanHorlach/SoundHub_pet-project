const categoryService = require("../services/category-service");

class CategoryController {
  async getAll(req, res, next){
    try {
      const data = await categoryService.getAll();
      return res.status(200).json(data);
    }
    catch{
      console.error(error);
      const status = error.status || 500;
      const message = error.message || 'Server Error';
      return res.status(status).json({ message });
    }
  }
}

module.exports = new CategoryController();
