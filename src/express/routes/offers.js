'use strict';

const {Router} = require(`express`);
const {globalData} = require(`../templates/data/global`);
const {categories} = require(`../templates/data/categories`);
const {offers} = require(`../templates/data/offers`);
const {comments} = require(`../templates/data/comments`);
const {users} = require(`../templates/data/users`);
const {commentsFormInputs, ticketFormInputs} = require(`../templates/data/form-inputs`);
const {mapOffer} = require(`../../utils`);

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

offersRouter.get(`/add`, (req, res) => {
  res.render(`new-ticket`, {
    ...globalData,
    ticketFormInputs,
    selectOptions: categories.map((category) => {
      return {
        id: category.id,
        title: category.title,
        selected: false
      };
    }),
    editMode: false,
  });
});

offersRouter.get(`/edit/:id`, (req, res) => {
  const pathId = Number(req.params.id);

  let offer = offers.find((item) => item.id === pathId);
  offer = mapOffer(offer, categories, comments, users);

  const selectOptions = categories.map((category) => {
    return {
      id: category.id,
      title: category.title,
      selected: offer.categories.some((cat) => cat.id === category.id)
    };
  });

  ticketFormInputs[0][0].value = offer.title;
  ticketFormInputs[1][0].value = offer.description;

  res.render(`ticket-edit`, {
    ...globalData,
    offer,
    ticketFormInputs,
    selectOptions,
    editMode: true,
  });
});

offersRouter.get(`/:id`, (req, res) => {
  const pathId = Number(req.params.id);

  let offer = offers.find((item) => item.id === pathId);
  offer = mapOffer(offer, categories, comments, users);

  res.render(`ticket`, {
    ...globalData,
    commentsFormInputs,
    offer
  });
});

module.exports = offersRouter;
