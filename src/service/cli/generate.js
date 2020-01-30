'use strict';
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  TITLES,
  SENTENCES,
  CATEGORIES,
  OfferType,
  SumRestrict,
  PictureRestrict
} = require(`../cli/constants`);

const {
  ExitCode
} = require(`../../constants`);

const getPictureFileName = (num) => {
  const result = num.toString().length > 1 ? num : `0${num}`;
  return `item${result}.jpg`;
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));
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
