'use strict';

const express = require(`express`);
const homeRoutes = require(`./routes/home`);
const registerRoutes = require(`./routes/register`);
const loginRoutes = require(`./routes/login`);
const myRoutes = require(`./routes/my`);
const searchRoutes = require(`./routes/search`);
const offersRoutes = require(`./routes/offers`);

const DEFAULT_PORT = 8080;

const app = express();

app.use(`/`, homeRoutes);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/search`, searchRoutes);
app.use(`/offers`, offersRoutes);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
