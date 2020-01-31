'use strict';

module.exports.DEFAULT_COUNT = 1;
module.exports.FILE_NAME = `mocks.json`;

module.exports.FilePath = {
  sentences: `./data/sentences.txt`,
  titles: `./data/titles.txt`,
  categories: `./data/categories.txt`
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
