'use strict';

module.exports.loginFormInputs = [
  {id: `user-email`, type: `email`, title: `Эл. почта`, class: `login__field`, required: true},
  {id: `user-password`, type: `password`, title: `Пароль`, class: `login__field`, required: true},
];

module.exports.registerFormInputs = [
  {id: `user-name`, type: `text`, title: `Имя и фамилия`, class: `sign-up__field`, required: true},
  {id: `user-email`, type: `email`, title: `Эл. почта`, class: `sign-up__field`, required: true},
  {id: `user-password`, type: `password`, title: `Пароль`, class: `sign-up__field`, required: true},
  {id: `user-password-again`, type: `password`, title: `Пароль еще раз`, class: `sign-up__field`, required: true},
];

module.exports.commentsFormInputs = [
  {id: `comment-field`, type: `textarea`, name: `comment`, title: `Текст комментария`, required: true},
];
