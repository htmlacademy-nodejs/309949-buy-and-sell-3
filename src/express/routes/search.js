'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const {globalData} = require(`../templates/data/global`);

const router = Router;
const searchRouter = router();

const getRecentOffers = (offers) => offers
  .slice()
  .sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  })
  .slice(0, 8);

searchRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers();
  try {
    const {query} = req.query;
    const results = await api.search(query);
    res.render(`search-result`, {
      ...globalData,
      results,
      offersRecent: getRecentOffers(offers),
      path: req.baseUrl
    });
  } catch (error) {
    res.render(`search-result`, {
      ...globalData,
      results: [],
      offersRecent: getRecentOffers(offers),
      path: req.baseUrl
    });
  }
});

module.exports = searchRouter;
