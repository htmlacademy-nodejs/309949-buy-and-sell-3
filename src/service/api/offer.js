'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../constants`);
const keysValidator = require(`../middleware/keysValidator`);
const offerExists = require(`../middleware/offerExists`);

const route = new Router();

const offerKeys = [`category`, `description`, `picture`, `title`, `type`, `sum`];
const commentKeys = [`text`];

module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, route);

  // Offers

  route.post(`/`, keysValidator(offerKeys), (req, res) => {
    const offer = offerService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  route.get(`/`, (req, res) => {
    const offers = offerService.findAll();

    res.status(HttpCode.OK)
      .json(offers);
  });

  route.get(`/:offerId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.put(`/:offerId`, [offerExists(offerService), keysValidator(offerKeys)], (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.update(offerId, req.body);

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.delete(`/:offerId`, offerExists(offerService), (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.drop(offerId);

    return res.status(HttpCode.OK)
      .json(offer);
  });

  // Comments

  route.post(`/:offerId/comments`, [offerExists(offerService), keysValidator(commentKeys)], (req, res) => {
    const {offer} = res.locals;
    const comment = commentService.create(req.body, offer);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });

  route.get(`/:offerId/comments`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    res.status(HttpCode.OK)
      .json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExists(offerService), (req, res) => {
    const {commentId} = req.params;
    const {offer} = res.locals;
    const comment = commentService.drop(commentId, offer);

    if (!comment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Comment with id ${commentId} not found`);
    }

    return res.status(HttpCode.OK)
      .json(comment);
  });
};

