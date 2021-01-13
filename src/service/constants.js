'use strict';

module.exports.DEFAULT_COMMAND = `--help`;
module.exports.USER_ARGV_INDEX = 2;
module.exports.ExitCode = {
  SUCCESS: 0,
  FAILURE: 1
};

module.exports.DEFAULT_COUNT = 1;
module.exports.FILE_NAME = `mocks.json`;
module.exports.DEFAULT_PORT = 3000;
module.exports.MAX_ID_LENGTH = 6;
module.exports.MAX_COMMENTS = 4;
module.exports.API_PREFIX = `/api`;

module.exports.FilePath = {
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
  COMMENTS: `./data/comments.txt`
};

module.exports.OfferType = {
  BUY: `buy`,
  SELL: `sell`,
};

module.exports.SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

module.exports.PictureRestrict = {
  MIN: 0,
  MAX: 16
};

module.exports.HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports.Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};
