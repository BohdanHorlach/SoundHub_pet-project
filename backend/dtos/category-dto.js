const { BadRequest } = require("../exceptions/api-errors");
const { Category } = require("../models");

module.exports = class CategoryDTO {
  id;
  name;

  constructor(category) {
    if(!(category instanceof Category)) {
      throw BadRequest('Expected instance of Category model');
    }

    this.id = category.id;
    this.name = category.name;
  }
}
