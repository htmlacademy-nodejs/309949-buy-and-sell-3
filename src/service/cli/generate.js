'use strict';
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {
  getRandomInt,
  readContent,
  shuffle,
} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  FilePath,
  OfferType,
  SumRestrict,
  PictureRestrict,
  ExitCode
} = require(`../constants`);

const getPictureFileName = (num) => {
  return `item${num.toString().padStart(2, 0)}.jpg`;
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateOffers = (count, titles, categories, sentences, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    category: [categories[getRandomInt(0, categories.length - 1)]],
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(fs, chalk, FilePath.SENTENCES);
    const titles = await readContent(fs, chalk, FilePath.TITLES);
    const categories = await readContent(fs, chalk, FilePath.CATEGORIES);
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const comments = await readContent(fs, chalk, FilePath.COMMENTS);
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences, comments));

    if (count > 1000) {
      console.error(chalk.red(`Count exceeded 1000 items. Process exited with exit code ${ExitCode.FAILURE}`));
      process.exit(ExitCode.FAILURE);
    } else {
      try {
        await fs.writeFile(FILE_NAME, content);
        console.info(chalk.green(`Operation successful. File created.`));
      } catch (err) {
        console.error(chalk.red(`Cannot write data to file... Process exited with exit code ${ExitCode.FAILURE}`));
        process.exit(ExitCode.FAILURE);
      }
    }
  }
};
