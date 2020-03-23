'use strict';

module.exports.loginFormInputs = [
  {id: `user-email`, type: `email`, title: `Эл. почта`, class: `login__field`},
  {id: `user-password`, type: `password`, title: `Пароль`, class: `login__field`},
];

module.exports.registerFormInputs = [
  {id: `user-name`, type: `text`, title: `Имя и фамилия`, class: `sign-up__field`},
  {id: `user-email`, type: `email`, title: `Эл. почта`, class: `sign-up__field`},
  {id: `user-password`, type: `password`, title: `Пароль`, class: `sign-up__field`},
  {id: `user-password-again`, type: `password`, title: `Пароль еще раз`, class: `sign-up__field`},
];
