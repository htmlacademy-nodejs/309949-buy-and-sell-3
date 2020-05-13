'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../constants`);
const offerValidator = require(`../middleware/offerValidator`);
const offerExists = require(`../middleware/offerExists`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/offers`, route);

  route.post(`/`, offerValidator, (req, res) => {
    const offer = service.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  route.get(`/`, (req, res) => {
    const offers = service.findAll();

    res.status(HttpCode.OK)
      .json(offers);
  });

  route.get(`/:offerId`, offerExists(service), (req, res) => {
    const {offer} = res.locals;

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.put(`/:offerId`, [offerExists(service), offerValidator], (req, res) => {
    const {offerId} = req.params;
    const offer = service.update(offerId, req.body);

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.delete(`/:offerId`, offerExists(service), (req, res) => {
    const {offerId} = req.params;
    const offer = service.drop(offerId);

    return res.status(HttpCode.OK)
      .json(offer);
  });
};

