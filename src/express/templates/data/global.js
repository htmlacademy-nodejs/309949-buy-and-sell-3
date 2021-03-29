'use strict';

const isLoggedIn = true;

const footerItems = [
  {title: `Вход и регистрация`, url: `${isLoggedIn ? `/offers/add` : `/register`}`},
  {title: `Создать объявление`, url: `/offers/add`}
];

const currentUser = {
  id: 1,
  name: `Денис Шкатулкин`,
  email: `email@example.com`,
  image: `/img/avatar.jpg`,
  retina: `img/avatar@2x.jpg`
};

module.exports.globalData = {
  isLoggedIn,
  currentUser,
  footerItems
};

module.exports.isError = false;
