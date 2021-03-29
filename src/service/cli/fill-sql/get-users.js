'use strict';

const {TEMPLATE_USERS} = require(`./constants`);
const {generateItems} = require(`./shared`);

module.exports = () => {
  const generateUser = (i, user) => {
    return `('${user.id}', '${user.name}', '${user.email}', '${user.password}', NULL, NOW())`;
  };
  return generateItems(TEMPLATE_USERS, generateUser);
};
