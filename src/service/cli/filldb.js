'use strict';
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getLogger} = require(`../lib/logger`);

const sequelize = require(`../lib/sequelize`);
const initDatabase = require(`../lib/init-db`);

const logger = getLogger({});

const {
  getRandomInt,
  readContent,
  shuffle,
} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  MAX_COMMENTS,
  FilePath,
  OfferType,
  SumRestrict,
  PictureRestrict,
  ExitCode
} = require(`../constants`);

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(
        ...items.splice(
            getRandomInt(0, items.length - 1), 1
        )
    );
  }
  return result;
};

const getPictureFileName = (num) => {
  return `item${num.toString().padStart(2, 0)}.jpg`;
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateOffers = (count, titles, categories, sentences, comments) => (
  Array(count).fill({}).map(() => ({
    categories: getRandomSubarray(categories),
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }))
);

module.exports = {
  name: `--filldb`,
  async run(args) {
    const [count] = args;

    if (count > 1000) {
      logger.error(chalk.red(`Count exceeded 1000 items. Process exited with exit code ${ExitCode.FAILURE}`));
      process.exit(ExitCode.FAILURE);
    } else {
      try {
        logger.info(`Trying to connect to database...`);
        await sequelize.authenticate();
      } catch (err) {
        logger.error(`An error occured: ${err.message}`);
        process.exit(1);
      }
      logger.info(`Connection to database established`);

      const sentences = await readContent(fs, chalk, FilePath.SENTENCES);
      const titles = await readContent(fs, chalk, FilePath.TITLES);
      const categories = await readContent(fs, chalk, FilePath.CATEGORIES);
      const comments = await readContent(fs, chalk, FilePath.COMMENTS);

      const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

      const offers = generateOffers(countOffer, titles, categories, sentences, comments);
      return initDatabase(sequelize, {offers, categories});
    }
    return null; // consistent return
  }
};
