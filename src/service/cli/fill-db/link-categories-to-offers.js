'use strict';

const {getRandomInt} = require(`../../../utils`);
const {CategoriesPerOffer} = require(`./constants`);
const {generateItems} = require(`./shared`);

module.exports = (count, categories) => {
  const items = [];
  items.length = count;
  items.fill(null);
  const generateCategoryToOfferLink = (index) => {
    let result = ``;
    const categoriesNum = getRandomInt(CategoriesPerOffer.MIN, CategoriesPerOffer.MAX);
    const categoriesOfOffer = new Set();
    for (let i = CategoriesPerOffer.MIN; i <= categoriesNum; i++) {
      categoriesOfOffer.add(getRandomInt(1, categories.length));
    }
    for (let categoryId of categoriesOfOffer) {
      result = `${result}${result ? `,\n` : ``}(${categoryId}, ${index + 1})`;
    }
    return result;
  };
  return generateItems(items, generateCategoryToOfferLink);
};
