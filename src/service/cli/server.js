'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const getMockData = require(`../lib/get-mock-data`);

const {
  DEFAULT_PORT,
  HttpCode
} = require(`../cli/constants`);

const app = express();
app.use(express.json());
app.get(`/offers`, async (req, res) => {
  const data = await getMockData();
  res.json(data);
});

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    if (port > 0 && port <= 65535) {
      app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
    } else {
      console.error(chalk.red(`Please enter port number between 1 and 65535`));
    }
  }
};
