'use strict';

const {
  getRandomInt,
  shuffle
} = require(`../../../utils`);

const {
  OfferType,
  SumRestrict
} = require(`../../constants`);

const {TEMPLATE_USERS} = require(`./constants`);
const {generateItems} = require(`./shared`);

module.exports = (count, titles, sentences) => {
  const items = [];
  items.length = count;
  items.fill(null);
  const generateOffer = (index) => {
    return `(${index + 1}, \
'${titles[getRandomInt(0, titles.length - 1)]}', \
'${shuffle(sentences).slice(1, 5).join(` `)}', \
NULL, \
'${Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]}', \
${getRandomInt(SumRestrict.min, SumRestrict.max)}, \
${getRandomInt(TEMPLATE_USERS[0].id, TEMPLATE_USERS[1].id)}, \
NOW())`;
  };
  return generateItems(items, generateOffer);
};
