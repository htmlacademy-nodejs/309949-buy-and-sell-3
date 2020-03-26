'use strict';

const {Router} = require(`express`);
const {globalData} = require(`../templates/data/global`);
const {offers} = require(`../templates/data/offers`);
const {categories} = require(`../templates/data/categories`);
const {comments} = require(`../templates/data/comments`);
const {mapOffers} = require(`../../utils`);

const router = Router;
const myRouter = router();

const myOffers = mapOffers(offers
  .slice()
  .filter((offer) => offer.authorId === globalData.currentUser.id), categories);

const offersWithComments = offers
  .map((offer) => {
    return {
      ...offer,
      comments: offer.comments
      .map((comment) => comments
        .find((item) => item.id === comment))
    };
  });

myRouter.get(`/`, (req, res) => {
  res.render(`my-tickets`, {
    ...globalData,
    myOffers,
    path: req.baseUrl
  });
});

myRouter.get(`/comments`, (req, res) => {
  res.render(`comments`, {
    ...globalData,
    offersWithComments,
    path: `${req.baseUrl}${req.path}`
  });
});

module.exports = myRouter;
