'use strict';

const express = require(`express`);
const homeRoutes = require(`./routes/home`);
const registerRoutes = require(`./routes/register`);
const loginRoutes = require(`./routes/login`);
const myRoutes = require(`./routes/my`);
const searchRoutes = require(`./routes/search`);
const offersRoutes = require(`./routes/offers`);

const {DEFAULT_PORT, PUBLIC_DIR} = require(`./constants`);

const app = express();

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));

app.set(`views`, `./src/express/templates/pages`);
app.set(`view engine`, `pug`);

app.use(express.static(PUBLIC_DIR));

app.use(`/`, homeRoutes);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/search`, searchRoutes);
app.use(`/offers`, offersRoutes);

