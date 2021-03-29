'use strict';

const {describe, beforeAll, test, expect} = require(`@jest/globals`);

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../../../lib/init-db`);
const category = require(`../../category`);
const DataService = require(`../../../data-service/category`);

const {HttpCode} = require(`../../../constants`);

const mockOffers = require(`../mocks/categoryMockData`);

const mockCategories = [
  `Книги`,
  `Авто`,
  `Бытовая техника`
];

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, offers: mockOffers});
  category(app, new DataService(mockDB));
});

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 3 categories`, () => expect(response.body.length).toBe(3));
  test(`Category names are "Книги", "Авто", "Бытовая техника"`,
      () => expect(response.body.map((it) => it.name)).toEqual(
          expect.arrayContaining([`Книги`, `Авто`, `Бытовая техника`])
      )
  );
});
