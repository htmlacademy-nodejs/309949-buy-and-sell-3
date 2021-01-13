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

module.exports.mapOffer = (offer, categories, comments, users) => {
  const offerNumber = offer.id.toString().length === 1 ? `0${offer.id}` : offer.id;
  return {
    ...offer,
    createdAt: new Date(offer.createdAt).toLocaleDateString(`ru-RU`, {year: `numeric`, month: `long`, day: `numeric`}),
    categories: offer.categories.map((cat) => categories.find((category) => category.id === cat)),
    comments: offer.comments.map((item) => comments.find((comment) => comment.id === item)),
    author: users.find((user) => user.id === offer.authorId),
    image: `/img/item${offerNumber}.jpg`,
    retina: `/img/item${offerNumber}@2x.jpg`,
  };
};

module.exports.readContent = async (fs, chalk, filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};
