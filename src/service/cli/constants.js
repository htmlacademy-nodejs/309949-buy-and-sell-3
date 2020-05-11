'use strict';

module.exports.DEFAULT_COUNT = 1;
module.exports.FILE_NAME = `mocks.json`;
module.exports.DEFAULT_PORT = 3000;
module.exports.MAX_ID_LENGTH = 6;
module.exports.MAX_COMMENTS = 4;

module.exports.FilePath = {
  sentences: `./data/sentences.txt`,
  titles: `./data/titles.txt`,
  categories: `./data/categories.txt`,
  comments: `./data/comments.txt`
};

module.exports.OfferType = {
  offer: `offer`,
  sale: `sale`,
};

module.exports.SumRestrict = {
  min: 1000,
  max: 100000,
};

module.exports.PictureRestrict = {
  min: 0,
  max: 16
};

module.exports.HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};
