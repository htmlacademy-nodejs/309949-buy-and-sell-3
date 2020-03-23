'use strict';

const {Router} = require(`express`);
const {globalData} = require(`../templates/data/global`);
const {loginFormInputs} = require(`../templates/data/form-inputs`);

const router = Router;
const loginRouter = router();

loginRouter.get(`/`, (req, res) => {
  res.render(`login`, {
    ...globalData,
    loginFormInputs
  });
});

module.exports = loginRouter;
