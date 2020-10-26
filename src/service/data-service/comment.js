'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class CommentService {

  create(comment, offer) {
    const {text} = comment;

    offer.comments = [...offer.comments, {id: nanoid(MAX_ID_LENGTH), text}];
    return comment;
  }

  findAll(offer) {
    return offer.comments || [];
  }

  drop(id, offer) {
    if (!offer) {
      return null;
    }
    const comment = offer.comments.find((item) => item.id === id);
    offer.comments = offer.comments.filter((item) => item.id !== id);
    return comment;
  }
}

module.exports = CommentService;
