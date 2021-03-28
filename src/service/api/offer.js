'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../constants`);
const keysValidator = require(`../middleware/keysValidator`);
const offerExists = require(`../middleware/offerExists`);

const offerKeys = [`category`, `description`, `picture`, `title`, `type`, `sum`];
const commentKeys = [`text`];

module.exports = (app, offerService, commentService) => {
  const route = new Router();
  app.use(`/offers`, route);

  // Offers

  route.get(`/`, async (req, res) => {
    const {comments} = req.query;
    const offers = await offerService.findAll(comments);
    res.status(HttpCode.OK).json(offers);
  });

  route.get(`/:offerId`, offerExists(offerService), async (req, res) => {
    const {offer} = await res.locals;

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.post(`/`, keysValidator(offerKeys), async (req, res) => {
    const offer = await offerService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  route.put(`/:offerId`, [offerExists(offerService), keysValidator(offerKeys)], async (req, res) => {
    const {offerId} = req.params;
    const offer = await offerService.update(offerId, req.body);

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.delete(`/:offerId`, offerExists(offerService), async (req, res) => {
    const {offerId} = req.params;
    const offer = await offerService.drop(offerId);

    return res.status(HttpCode.OK)
      .json(offer);
  });

  // Comments

  route.post(`/:offerId/comments`, [offerExists(offerService), keysValidator(commentKeys)], async (req, res) => {
    const {offer} = res.locals;
    const comment = await commentService.create(req.body, offer);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });

  route.get(`/:offerId/comments`, offerExists(offerService), async (req, res) => {
    const {offer} = res.locals;
    const comments = await commentService.findAll(offer);

    res.status(HttpCode.OK)
      .json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExists(offerService), async (req, res) => {
    const {commentId} = req.params;
    const {offer} = res.locals;
    const comment = await commentService.drop(commentId, offer);

    if (!comment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Comment with id ${commentId} not found`);
    }

    return res.status(HttpCode.OK)
      .json(comment);
  });
};

