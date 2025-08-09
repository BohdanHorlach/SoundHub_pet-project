const { BadRequest } = require("../exceptions/api-errors");
const MusicCard = require("../models/music-card-model");

module.exports = class MusicCardDTO {
  id;
  title;
  audioUrl;
  status;
  authorId;
  categories;

  constructor(musicCard) {
    if(!(musicCard instanceof MusicCard)) {
      throw BadRequest('Expected instance of User model');
    }

    this.id = musicCard.id;
    this.title = musicCard.title;
    this.audioUrl = musicCard.audioUrl;
    this.status = musicCard.status;
    this.authorId = musicCard.authorId;
    
    this.categories = musicCard.categories ?? [];
  }
}