'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {
  ExitCode,
  FilePath,
} = require(`../../constants`);

const {readContent} = require(`../../../utils`);
const fillTemplate = require(`./fill-template`);

const {FILE_NAME, MAX_OFFERS, TEMPLATE_USERS} = require(`./constants`);

const getUsers = require(`./get-users`);
const getCategories = require(`./get-categories`);
const getOffers = require(`./get-offers`);
const linkCategoriesToOffers = require(`./link-categories-to-offers`);
const getComments = require(`./get-comments`);

module.exports = {
  name: `--fill`,
  async run(args) {
    const [count] = args;

    if (count > MAX_OFFERS) {
      console.error(chalk.red(`Count exceeded ${MAX_OFFERS} items. Process exited with exit code ${ExitCode.FAILURE}`));
      process.exit(ExitCode.FAILURE);
    } else {
      try {
        const categories = await readContent(fs, chalk, FilePath.CATEGORIES);
        const sentences = await readContent(fs, chalk, FilePath.SENTENCES);
        const titles = await readContent(fs, chalk, FilePath.TITLES);
        const comments = await readContent(fs, chalk, FilePath.COMMENTS);
        const content =
          `${fillTemplate(`users`, getUsers())}

${fillTemplate(`categories`, getCategories(categories))}

${fillTemplate(`offers`, getOffers(count, titles, sentences))}

${fillTemplate(`categories_offers`, linkCategoriesToOffers(count, categories))}

${fillTemplate(`comments`, getComments(count, comments, TEMPLATE_USERS))}
`;
        await fs.writeFile(FILE_NAME, content);
        console.info(chalk.green(`Operation successful. File created.`));
      } catch (err) {
        console.error(chalk.red(`Cannot write data to file... Process exited with exit code ${ExitCode.FAILURE}`));
        process.exit(ExitCode.FAILURE);
      }
    }
  }
};
