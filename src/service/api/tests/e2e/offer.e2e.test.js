'use strict';
const {describe, beforeAll, test, expect} = require(`@jest/globals`);

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../../../lib/init-db`);
const offer = require(`../../offer`);
const DataService = require(`../../../data-service/offer`);
const CommentsService = require(`../../../data-service/comment`);

const {HttpCode} = require(`../../../constants`);

const mockCategories = [
  `Животные`,
  `Товары для детей`,
  `Авто`,
  `Книги`
];

const mockData = require(`../mocks/offerMockData`);

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {categories: mockCategories, offers: mockData});
  const app = express();
  app.use(express.json());
  offer(app, new DataService(mockDB), new CommentsService(mockDB));
  return app;
};

describe(`API returns a list of all offers`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 5 offers`, () => expect(response.body.length).toBe(5));
  test(`First offer title equals "Куплю айфон этого года"`, () => expect(response.body[0].title).toBe(`Куплю айфон этого года`));

});

describe(`API returns an offer with given id`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/offers/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Offer's title is "Куплю айфон этого года"`, () => expect(response.body.title).toBe(`Куплю айфон этого года`));
});

// describe(`API creates an offer if data is valid`, () => {
//   const newOfferOne = {
//     categories: [1, 2],
//     title: `Тест тест`,
//     description: `Тестирую тестовые данные 1`,
//     picture: `test.jpg`,
//     type: `OFFER`,
//     sum: 1934
//   };
//
//   let app;
//   let response;
//
//   beforeAll(async () => {
//     app = await createAPI();
//     response = await request(app)
//       .post(`/offers`)
//       .send(newOfferOne);
//   });
//
//   test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
//   test(`Offers count is changed`, () => request(app)
//     .get(`/offers`)
//     .expect((res) => expect(res.body.length).toBe(6))
//   );
// });

describe(`API refuses to create an offer if data is invalid`, () => {
  const newOffer = {
    categories: `Тестовое предложение`,
    title: `Тест тест`,
    description: `Тестирую тестовые данные 2`,
    picture: `test.jpg`,
    type: `OFFER`,
    sum: 1934
  };

  let app;

  beforeAll(async () => {
    app = await createAPI();
  });

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent offer`, () => {
  const updatedOffer = {
    categories: [2],
    title: `Обновленный тест`,
    description: `Тестирую тестовые данные 3`,
    picture: `test.jpg`,
    type: `OFFER`,
    sum: 1934
  };

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .put(`/offers/2`)
      .send(updatedOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer is really changed`, () => request(app)
    .get(`/offers/2`)
    .expect((res) => expect(res.body.title).toBe(`Обновленный тест`))
  );
});

test(`API returns status code 404 when trying to change non-existent offer`, async () => {
  const app = await createAPI();

  const validOffer = {
    categories: [3],
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404
  };

  return request(app)
    .put(`/offers/200`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, async () => {
  const app = await createAPI();

  const invalidOffer = {
    categories: [`Это`],
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
    .put(`/offers/2`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/offers/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Offer count is 4 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => {
      expect(res.body.length).toBe(4);
    })
  );
});

test(`API refuses to delete non-existent offer`, async () => {
  const app = await createAPI();

  return request(app)
    .delete(`/offers/20`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given offer`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/offers/2/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 2 comments`, () => expect(response.body.length).toBe(2));
  test(`First comment text is "Почему в таком ужасном состоянии?"`, () => expect(response.body[0].text).toBe(`Почему в таком ужасном состоянии?`));
});

// describe(`API creates a comment if data is valid`, () => {
//   const newComment = {
//     text: `Валидному комментарию достаточно этого поля`
//   };
//
//   let app;
//   let response;
//
//   beforeAll(async () => {
//     app = await createAPI();
//     response = await request(app)
//       .post(`/offers/1/comments`)
//       .send(newComment);
//   });
//
//   test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
//
//   test(`Comments count is changed`, () => request(app)
//     .get(`/offers/1/comments`)
//     .expect((res) => expect(res.body.length).toBe(4))
//   );
// });

test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {
  const app = await createAPI();

  return request(app)
    .post(`/offers/1/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);
});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, async () => {
  const app = await createAPI();

  return request(app)
    .post(`/offers/100/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete non-existent comment`, async () => {
  const app = await createAPI();

  return request(app)
    .delete(`/offers/1/comments/150`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API correctly deletes a comment`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/offers/1/comments/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Comments count is 3 now`, () => request(app)
    .get(`/offers/1/comments`)
    .expect((res) => expect(res.body.length).toBe(1))
  );
});
