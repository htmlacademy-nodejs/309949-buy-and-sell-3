'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const {query} = req.query;

    if (!query) {
      return res.status(HttpCode.BAD_REQUEST)
        .send(`Search query is empty`);
    }

    const offers = service.findAll(query);

    if (offers.length <= 0) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`No offers found for search query ${query}`);
    }

    return res.status(HttpCode.OK)
      .json(offers);
  });
};
