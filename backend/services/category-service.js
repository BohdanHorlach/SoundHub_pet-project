const CategoryDTO = require("../dtos/category-dto");
const { Category } = require("../models");

class CategoryService {
  async getAll() {
    const categories = await Category.findAll({ attributes: ['id', 'name'], order: [['name', 'ASC']] });
    return categories.map(cat => new CategoryDTO(cat));
  }
}


module.exports = new CategoryService();