'use strict';
const {globalData} = require(`../templates/data/global`);
const {categories} = require(`../templates/data/categories`);
const {offers} = require(`../templates/data/offers`);
const {searchItems} = require(`../templates/data/search`);
const {mapOffers} = require(`../../utils`);
const {Router} = require(`express`);

const router = Router;
const searchRouter = router();

const searchOffers = searchItems.map((item) => offers.find((offer) => offer.id === item));

const searchResults = mapOffers(searchOffers
  .slice(), categories);

const offersRecent = mapOffers(offers
  .slice()
  .sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  })
  .slice(0, 8), categories);

searchRouter.get(`/`, (req, res) => {
  res.render(`search-result`, {
    ...globalData,
    searchResults,
    offersRecent,
    path: req.baseUrl
  });
});

module.exports = searchRouter;
