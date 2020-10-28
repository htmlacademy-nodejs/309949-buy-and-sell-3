'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const {globalData} = require(`../templates/data/global`);

const router = Router;
const myRouter = router();

// const getOffersWithComments = (offers) => offers
//   .map((offer) => {
//     return {
//       ...offer,
//       comments: offer.comments
//       .map((comment) => comments
//         .find((item) => item.id === comment))
//     };
//   });

myRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`my-tickets`, {
    ...globalData,
    myOffers: offers,
    path: req.baseUrl
  });
});

myRouter.get(`/comments`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`comments`, {
    ...globalData,
    offersWithComments: offers.slice(0, 3),
    path: `${req.baseUrl}${req.path}`
  });
});

module.exports = myRouter;
