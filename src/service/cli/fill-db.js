'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {
  ExitCode,
  FilePath,
  OfferType,
  SumRestrict
} = require(`../constants`);

const {
  readContent,
  getRandomInt,
  shuffle
} = require(`../../utils`);

const MAX_OFFERS = 100;
const FILE_NAME = `fill-db.sql`;
const MIN_CATEGORIES_PER_OFFER = 1;
const MAX_CATEGORIES_PER_OFFER = 4;

const templateUsers = [
  {id: 1, name: `Михаил Михайлов`, email: `mikhaylov@mail.ru`, password: `qwerty12345`},
  {id: 2, name: `Пётр Петров`, email: `petrovp@yandex.ru`, password: `12345qwerty`}
];

const generateItems = (templateItems, generateItem) => {
  let result = ``;
  for (let [index, item] of templateItems.entries()) {
    if (index === 0) {
      result = `${generateItem(index, item)},`;
    } else {
      result = `${result}\n${generateItem(index, item)}${templateItems.length - 1 === index ? `` : `,`}`;
    }
  }
  return `${result}`;
};

const getUsers = () => {
  const generateUser = (i, user) => {
    return `('${user.id}', '${user.name}', '${user.email}', '${user.password}', NULL, NOW())`;
  };
  return generateItems(templateUsers, generateUser);
};

const getCategories = (mockCategories) => {
  const generateCategory = (index, category) => {
    return `(${index + 1}, '${category}', NOW())`;
  };
  return generateItems(mockCategories, generateCategory);
};

const getOffers = (count, titles, sentences) => {
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
${getRandomInt(templateUsers[0].id, templateUsers[1].id)}, \
NOW())`;
  };
  return generateItems(items, generateOffer);
};

const linkCategoriesToOffers = (count, categories) => {
  const items = [];
  items.length = count;
  items.fill(null);
  const generateCategoryToOfferLink = (index) => {
    let result = ``;
    const categoriesNum = getRandomInt(MIN_CATEGORIES_PER_OFFER, MAX_CATEGORIES_PER_OFFER);
    const categoriesOfOffer = new Set();
    for (let i = MIN_CATEGORIES_PER_OFFER; i <= categoriesNum; i++) {
      categoriesOfOffer.add(getRandomInt(1, categories.length));
    }
    for (let categoryId of categoriesOfOffer) {
      result = `${result}${result ? `,\n` : ``}(${categoryId}, ${index + 1})`;
    }
    return result;
  };
  return generateItems(items, generateCategoryToOfferLink);
};

const getComments = (count, comments, users) => {
  const items = [];
  for (let i = 1; i <= count; i++) {
    let commentsNumber = getRandomInt(2, 5);
    for (let commentId = 1; commentId <= commentsNumber; commentId++) {
      items.push(i);
    }
  }
  const generateComments = (index, offerId) => {
    return `(${index + 1}, \
'${shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `)}', \
${getRandomInt(users[0].id, users[1].id)}, \
${offerId}, \
NOW())`;
  };
  return generateItems(items, generateComments);
};

const fillTemplate = (tableName, values) => `INSERT INTO ${tableName} VALUES\n${values}\nON CONFLICT DO NOTHING;`;

module.exports = {
  name: `--fill`,
  async run(args) {
    const [count] = args;
    const sentences = await readContent(fs, chalk, FilePath.sentences);
    const titles = await readContent(fs, chalk, FilePath.titles);
    const comments = await readContent(fs, chalk, FilePath.comments);

    if (count > MAX_OFFERS) {
      console.error(chalk.red(`Count exceeded ${MAX_OFFERS} items. Process exited with exit code ${ExitCode.failure}`));
      process.exit(ExitCode.failure);
    } else {
      try {
        const categories = await readContent(fs, chalk, FilePath.categories);
        const content =
`${fillTemplate(`users`, getUsers())}

${fillTemplate(`categories`, getCategories(categories))}

${fillTemplate(`offers`, getOffers(count, titles, sentences))}

${fillTemplate(`categories_offers`, linkCategoriesToOffers(count, titles, sentences))}

${fillTemplate(`comments`, getComments(count, comments, templateUsers))}
`;
        await fs.writeFile(FILE_NAME, content);
        console.info(chalk.green(`Operation successful. File created.`));
      } catch (err) {
        console.error(chalk.red(`Cannot write data to file... Process exited with exit code ${ExitCode.failure}`));
        process.exit(ExitCode.failure);
      }
    }
  }
};
