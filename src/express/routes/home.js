'use strict';
const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const {globalData} = require(`../templates/data/global`);
const {categories} = require(`../templates/data/categories`);

const router = Router;
const homeRouter = router();

const getRecentOffers = (offers) => offers
  .slice()
  .sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  })
  .slice(0, 8);

const getPopularOffers = (offers) => offers
  .slice()
  .filter((offer) => offer.comments.length !== 0)
  .sort((a, b) => {
    const commentsLengthA = (a.comments || []).length;
    const commentsLengthB = (b.comments || []).length;
    return commentsLengthB - commentsLengthA;
  })
  .slice(0, 8);

homeRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`main`, {
    ...globalData,
    categories,
    offersRecent: await getRecentOffers(offers),
    offersPopular: await getPopularOffers(offers),
    path: req.path
  });
});

module.exports = homeRouter;
