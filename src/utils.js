'use strict';

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }
  return someArray;
};

module.exports.mapOffers = (offers, categories) => {
  return offers.map((offer) => {
    const offerNumber = offer.id.toString().length === 1 ? `0${offer.id}` : offer.id;
    return {
      ...offer,
      color: offerNumber,
      image: `/img/item${offerNumber}.jpg`,
      retina: `/img/item${offerNumber}@2x.jpg`,
      categories: offer.categories.map((cat) => {
        return categories.find((category) => category.id === cat);
      })
    };
  });
};
