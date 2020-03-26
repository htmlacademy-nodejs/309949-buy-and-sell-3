'use strict';

const {Router} = require(`express`);
const {globalData} = require(`../templates/data/global`);
const {registerFormInputs} = require(`../templates/data/form-inputs`);

const router = Router;
const registerRouter = router();

registerRouter.get(`/`, (req, res) => {
  res.render(`sign-up`, {
    ...globalData,
    registerFormInputs
  });
});

module.exports = registerRouter;
