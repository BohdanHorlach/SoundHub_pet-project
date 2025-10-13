const { Op, Sequelize } = require("sequelize");
const { Category, MusicCard, User, Favorite } = require("../models");
const MusicCardDTO = require("../dtos/music-card-dto");
const path = require('path');
const audioConverter = require("../utils/audio-converter");
const audioUploader = require("../utils/audio-uploader");
const { convertedPath } = require("../config/cleaners-config");
const MusicCardStatus = require("../enums/music-card-status");
const { BadRequest } = require("../exceptions/api-errors");
const { bucket } = require("../config/firebase-config");


const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 9;


class MusicCardService {

  #validateLimit(limit){
    return limit <= 0 ? DEFAULT_LIMIT : limit;
  }


  #buildBaseFilter(title = "", status) {
    const where = { status };
    const cardName = title.trim();

    if (cardName) {
      where.title = {
        [Op.like]: `%${cardName}%`
      };
    }

    return where;
  }


  #buildCategoriesFilter(categories) {
    return {
      [Op.in]: Sequelize.literal(`(
        SELECT musicCardId
        FROM categorymusics
        WHERE categoryId IN (${categories.join(',')})
        GROUP BY musicCardId
        HAVING COUNT(DISTINCT categoryId) = ${categories.length}
      )`)
    };
  }


  #getSearchQuery({ page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, title = "", categories = [], status = MusicCardStatus.APPROVED }) {
    limit = this.#validateLimit(limit);
    const offset = (page - 1) * limit;
    const where = this.#buildBaseFilter(title, status);

    if(categories.length > 0){
      where.id = this.#buildCategoriesFilter(categories);
    }
    
    const query = {
      limit: Number(limit),
      offset: Number(offset),
      order: [['createdAt', 'DESC']],
      where,
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
    };

    return query;
  }


  async #findAndCountAll(baseQuery, userId) {
    const { rows, count } = await MusicCard.findAndCountAll(baseQuery);
    const limit = this.#validateLimit(baseQuery.limit);

    const favorites = await Favorite.findAll({
      where: { userId: userId },
      attributes: ["musicCardId"],
      raw: true
    });
    const favoriteIds = favorites.map(f => f.musicCardId);

    const cards = rows.map(musicCard =>
      new MusicCardDTO(musicCard, favoriteIds.includes(musicCard.id))
    );
  
    return {
      cards,
      total: count,
      currentPage: Number(baseQuery.offset / limit) + 1,
      totalPages: Math.ceil(count / limit),
    };
  }


  async #setCategories(musicCard, categories) {
    if (categories.length > 0) {
      const foundCategories = await Category.findAll({
        where: {
          id:  { [Op.in]: categories },
        },
      });
  
      await musicCard.setCategories(foundCategories); 
    }

    await musicCard.reload({
      include: [{
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }],
    });

    return new MusicCardDTO(musicCard);
  }


  async #createCard(title, authorId, publicUrl, storagePath, categories) {
    const newCard = await MusicCard.create({
      title: title,
      publicUrl: publicUrl,
      storagePath: storagePath,
      authorId: authorId,
    });

    return await this.#setCategories(newCard, categories);
  }


  async getCardsByType(userId, { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, title = "", categories = [], status = MusicCardStatus.APPROVED }, type = "all") {
    const baseQuery = this.#getSearchQuery({ page, limit, title, categories, status });

    switch (type) {
      case "favorite":
        baseQuery.include.push({
          model: User,
          as: 'favoritedBy',
          attributes: [],
          through: { where: { userId }, attributes: [] },
          required: true
        });
        break;
  
      case "uploads":
        baseQuery.where = {
          ...baseQuery.where,
          authorId: userId
        };
        break;
  
      case "all":
      default:
        break;
    }

    return this.#findAndCountAll(baseQuery, userId);
  }


  async upload(userId, { title = "Untitled", categories = []}, file){
    const { name, ext } = path.parse(file.originalname);
    const inputPath = file.path;
    const outputExt = "mp3";
    const outputName = `${userId}_${title}_${name}_${Date.now()}.${outputExt}`;
    const outputPath = path.join(convertedPath, outputName);
    let uploadedToFirebase = false;

    try {
      await audioConverter.convertToMp3(inputPath, outputPath, outputExt);
      const { publicUrl, storagePath } = await audioUploader.upload(outputPath, outputName);
      uploadedToFirebase = true;

      return this.#createCard(title, userId, publicUrl, storagePath, categories);
    } 
    catch (err) {
      if(uploadedToFirebase)
        await audioUploader.deleteFileFromFirebase(outputName);

      throw err;
    }
  }


  async update(id, { title = "Untitled", categories = [], status = MusicCardStatus.APPROVED }){
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


  async getSignedDownloadUrl(id) {
    const musicCard = await MusicCard.findByPk(id);
  
    if (!musicCard) {
      throw BadRequest('MusicCard not found');
    }

    const file = bucket.file(musicCard.storagePath);
    const filename = `${musicCard.title}.mp3`;
    const encodedFilename = encodeURIComponent(filename);
  
    const expiresMs = Date.now() + 15 * 60 * 1000;
    const options = {
      version: "v4",
      action: "read",
      expires: expiresMs,
      queryParams: {
        "response-content-disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodedFilename}`,
        "response-content-type": "audio/mpeg"
      }
    };

    const [url] = await file.getSignedUrl(options);
    return url;
  }
}


module.exports = new MusicCardService();