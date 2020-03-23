'use strict';
const {globalData} = require(`../templates/data/global`);
const {categories} = require(`../templates/data/categories`);
const {offersRecent, offersPopular} = require(`../templates/data/offers`);

const {Router} = require(`express`);
const router = Router;
const homeRouter = router();

homeRouter.get(`/`, (req, res) => {
  res.render(`main`, {
    ...globalData,
    categories,
    offersRecent,
    offersPopular
  });
});

module.exports = homeRouter;
