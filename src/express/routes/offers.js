'use strict';

const {Router} = require(`express`);
const {globalData} = require(`../templates/data/global`);
const {categories} = require(`../templates/data/categories`);

const router = Router;
const offersRouter = router();

offersRouter.get(`/category/:id`, (req, res) => {
  const pathId = Number(req.params.id);
  const category = categories.find((cat) => cat.id === pathId);
  res.render(`category`, {
    ...globalData,
    categories,
    category,
    pathId
  });
});
offersRouter.get(`/add`, (req, res) => res.send(`/offers/add`));
offersRouter.get(`/edit/:id`, (req, res) => res.send(`/offers/edit/:id`));
offersRouter.get(`/:id`, (req, res) => res.send(`/offers/:id`));

module.exports = offersRouter;
