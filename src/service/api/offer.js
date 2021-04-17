'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../constants`);
const keysValidator = require(`../middleware/keysValidator`);
const offerExists = require(`../middleware/offerExists`);

const offerKeys = [`categories`, `description`, `picture`, `title`, `type`, `sum`];
const commentKeys = [`text`];

module.exports = (app, offerService, commentService) => {
  const route = new Router();
  app.use(`/offers`, route);

  // Offers

  route.get(`/`, async (req, res) => {
    const {offset, limit, comments} = req.query;
    let result;
    if (limit || offset) {
      result = await offerService.findPage({limit, offset});
    } else {
      result = await offerService.findAll(comments);
    }

    res.status(HttpCode.OK).json(result);
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
    const {offerId} = req.params;
    const comment = await commentService.create(offerId, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });

  route.get(`/:offerId/comments`, offerExists(offerService), async (req, res) => {
    const {offerId} = req.params;

    const comments = await commentService.findAll(offerId);

    res.status(HttpCode.OK)
      .json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExists(offerService), async (req, res) => {
    const {commentId} = req.params;
    const deleted = await commentService.drop(commentId);

    if (!deleted) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Comment with id ${commentId} not found`);
    }
    return res.status(HttpCode.OK)
      .json(deleted);
  });
};

