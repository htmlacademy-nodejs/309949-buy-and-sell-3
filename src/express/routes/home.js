'use strict';
const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const {globalData} = require(`../templates/data/global`);
const {OFFERS_PER_PAGE} = require(`../constants`);

const router = Router;
const homeRouter = router();

homeRouter.get(`/`, async (req, res) => {
  let {page = 1} = req.query;
  page = +page;

  const limit = OFFERS_PER_PAGE;
  const offset = (page - 1) * OFFERS_PER_PAGE;

  const [
    {count, offers},
    categories
  ] = await Promise.all([
    api.getOffers({limit, offset}),
    api.getCategories(true)
  ]);

  const totalPages = Math.ceil(count / OFFERS_PER_PAGE);

  res.render(`main`, {
    ...globalData,
    categories,
    totalPages,
    page,
    offersRecent: offers,
    path: req.path
  });
});

module.exports = homeRouter;
