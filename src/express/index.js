'use strict';

const express = require(`express`);
const path = require(`path`);
const homeRoutes = require(`./routes/home`);
const registerRoutes = require(`./routes/register`);
const loginRoutes = require(`./routes/login`);
const myRoutes = require(`./routes/my`);
const searchRoutes = require(`./routes/search`);
const offersRoutes = require(`./routes/offers`);

const {DEFAULT_PORT, PUBLIC_DIR} = require(`./constants`);

const app = express();

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates/pages`));
app.set(`view engine`, `pug`);

app.use(`/`, homeRoutes);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/search`, searchRoutes);
app.use(`/offers`, offersRoutes);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
