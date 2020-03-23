'use strict';

const {Router} = require(`express`);
const router = Router; // иначе ругается линтер
const homeRouter = router();

homeRouter.get(`/`, (req, res) => res.send(`/`));

module.exports = homeRouter;
