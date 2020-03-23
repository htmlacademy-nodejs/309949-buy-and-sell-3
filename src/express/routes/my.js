'use strict';

const {Router} = require(`express`);
const {globalData} = require(`../templates/data/global`);
const {myOffers} = require(`../templates/data/offers`);

const router = Router;
const myRouter = router();

myRouter.get(`/`, (req, res) => {
  res.render(`my-tickets`, {
    ...globalData,
    myOffers,
    path: req.baseUrl
  });
});
myRouter.get(`/comments`, (req, res) => res.send(`/my/comments`));

module.exports = myRouter;
