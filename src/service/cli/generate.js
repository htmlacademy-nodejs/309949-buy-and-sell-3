'use strict';
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {
  getRandomInt,
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

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const getPictureFileName = (num) => {
  return num.toString().length > 1 ? num : `0${num}`;
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
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FilePath.sentences);
    const titles = await readContent(FilePath.titles);
    const categories = await readContent(FilePath.categories);
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const comments = await readContent(FilePath.comments);
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences, comments));

    if (count > 1000) {
      console.error(chalk.red(`Count exceeded 1000 items. Process exited with exit code ${ExitCode.failure}`));
      process.exit(ExitCode.failure);
    } else {
      try {
        await fs.writeFile(FILE_NAME, content);
        console.info(chalk.green(`Operation successful. File created.`));
      } catch (err) {
        console.error(chalk.red(`Cannot write data to file... Process exited with exit code ${ExitCode.failure}`));
        process.exit(ExitCode.failure);
      }
    }
  }
};
