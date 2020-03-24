'use strict';

const isLoggedIn = true;

const footerItems = [
  {title: `Вход и регистрация`, url: `${isLoggedIn ? `/offers/add` : `/register`}`},
  {title: `Создать объявление`, url: `/offers/add`}
];

module.exports.globalData = {
  isLoggedIn,
  footerItems
};

module.exports.currentUser = {id: 1};
