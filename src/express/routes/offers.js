'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const {globalData} = require(`../templates/data/global`);

const router = Router;
const offersRouter = router();

// offersRouter.get(`/category/:id`, (req, res) => {
//   const pathId = Number(req.params.id);
//   const category = categories.find((cat) => cat.id === pathId);
//   res.render(`category`, {
//     ...globalData,
//     categories,
//     category,
//     pathId
//   });
// });

// offersRouter.get(`/add`, (req, res) => {
//   res.render(`new-ticket`, {
//     ...globalData,
//     ticketFormInputs,
//     selectOptions: categories.map((category) => {
//       return {
//         id: category.id,
//         title: category.title,
//         selected: false
//       };
//     }),
//     editMode: false,
//   });
// });

offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories()
  ]);

  res.render(`ticket-edit`, {
    ...globalData,
    offer,
    categories,
    editMode: true,
  });
});

// offersRouter.get(`/:id`, async (req, res) => {
//   const offers = await api.getOffers();
//   const pathId = Number(req.params.id);
//
//   let offer = offers.find((item) => item.id === pathId);
//   offer = mapOffer(offer, categories, comments, users);
//
//   res.render(`ticket`, {
//     ...globalData,
//     commentsFormInputs,
//     offer
//   });
// });

module.exports = offersRouter;
