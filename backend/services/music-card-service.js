const { Op } = require("sequelize");
const { Category, MusicCard, User } = require("../models");
const MusicCardDTO = require("../dtos/music-card-dto");
const path = require('path');
const audioConverter = require("../utils/audio-converter");
const audioUploader = require("../utils/audio-uploader");
const { convertedPath } = require("../config/temp-file-cleaner-config");
const MusicCardStatus = require("../enums/music-card-status");
const { BadRequest } = require("../exceptions/api-errors");


const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 9;


class MusicCardService {

  #validateLimit(limit){
    return limit <= 0 ? DEFAULT_LIMIT : limit;
  }


  #getSearchQuery({ page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, categories = [] }) {
    limit = this.#validateLimit(limit);
    
    const offset = (page - 1) * limit;
    const categoryFilter = {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    };
    
    if (categories.length > 0) {
      categoryFilter.where = { id: { [Op.in]: categories } };
    }

    const query = {
      limit: Number(limit),
      offset: Number(offset),
      order: [['createdAt', 'DESC']],
      include: [categoryFilter]
    };

    return query;
  }


  async #findAndCountAll(baseQuery) {
    const { rows, count } = await MusicCard.findAndCountAll(baseQuery);
    const limit = this.#validateLimit(baseQuery.limit);
    const cards = rows.map(musicCard => new MusicCardDTO(musicCard));
  
    return {
      cards,
      total: count,
      currentPage: Number(baseQuery.offset / limit) + 1,
      totalPages: Math.ceil(count / limit),
    };
  }


  async #setCategories(musicCard, categories) {
    const parsedCategories = JSON.parse(categories);

    if (parsedCategories.length > 0) {
      const foundCategories = await Category.findAll({
        where: {
          id:  { [Op.in]: parsedCategories },
        },
      });
  
      await musicCard.setCategories(foundCategories); 
    }

    await musicCard.reload({
      include: [{
        model: Category,
        as: 'categories',
        through: { attributes: [] }
      }],
    });

    return new MusicCardDTO(musicCard);
  }


  async #createCard(title, authorId, audioUrl, categories) {
    const newCard = await MusicCard.create({
      title: title,
      audioUrl: audioUrl,
      authorId: authorId,
    });

    return await this.#setCategories(newCard, categories);
  }


  async getFavorites(userId, { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, categories = [] }) {
    const baseQuery = this.#getSearchQuery({ page, limit, categories });
 
    baseQuery.include.push({
      model: User,
      as: 'favoritedBy',
      attributes: [],
      through: { where: { userId: userId }, attributes: [] }
    });
  
    return this.#findAndCountAll(baseQuery);
  }


  async getUploads(userId, { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, categories = [] }) {
    const baseQuery = this.#getSearchQuery({ page, limit, categories });
  
    baseQuery.where = { authorId: userId };
  
    return this.#findAndCountAll(baseQuery);
  }


  async getAll({ page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, categories = [] }) {
    const baseQuery = this.#getSearchQuery({ page, limit, categories });
    return this.#findAndCountAll(baseQuery);
  }


  async upload(userId, { title = "Untitled", categories = "[]" }, file){
    const { name, ext } = path.parse(file.originalname);
    const inputPath = file.path;
    const outputExt = "mp3";
    const outputName = `${userId}_${title}_${name}_${Date.now()}.${outputExt}`;
    const outputPath = path.join(convertedPath, outputName);
    let uploadedToFirebase = false;

    try {
      await audioConverter.convertToMp3(inputPath, outputPath, outputExt);
      const audioUrl = await audioUploader.upload(outputPath, outputName);
      uploadedToFirebase = true;

      return this.#createCard(title, userId, audioUrl, categories);
    } 
    catch (err) {
      if(uploadedToFirebase)
        await audioUploader.deleteFileFromFirebase(outputName);

      throw err;
    }
  }


  async update(id, { title = "Untitled", categories = "[]", status = MusicCardStatus.APPROVED }){
    const musicCard = await MusicCard.findByPk(id, {
      include: [{
        model: Category, 
        as: 'categories', 
        through: { attributes: [] } 
      }],
    });

    if (!musicCard) {
      throw BadRequest('MusicCard not found');
    }

    await musicCard.update({ title: title, status: status });
    return await this.#setCategories(musicCard, categories);
  }
}


module.exports = new MusicCardService();