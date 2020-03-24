'use strict';

module.exports.categories = [
  {id: 1, title: `Дом`, count: `81`, image: `/img/cat.jpg`, retina: `/img/cat@2x.jpg`},
  {
    id: 2,
    title: `Электроника`,
    count: `62`,
    image: `/img/cat02.jpg`,
    retina: `/img/cat02@2x.jpg`,
    offers: [
      {id: 6, color: `06`, image: `/img/item06.jpg`, retina: `/img/item06@2x.jpg`, type: `sell`, categories: [{id: 2, title: `Электроника`}], title: `Ableton`, price: `88 000`, description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними...`},
      {id: 8, color: `08`, image: `/img/item08.jpg`, retina: `/img/item08@2x.jpg`, type: `buy`, categories: [{id: 2, title: `Электроника`}], title: `Фотик Canon`, price: `32 000`, description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы...`},
      {id: 15, color: `15`, image: `/img/item15.jpg`, retina: `/img/item15@2x.jpg`, type: `sell`, categories: [{id: 2, title: `Электроника`}], title: `Кофемашина`, price: `26 000`, description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними...`},
      {id: 12, color: `12`, image: `/img/item12.jpg`, retina: `/img/item12@2x.jpg`, type: `buy`, categories: [{id: 2, title: `Электроника`}], title: `Радио Панасоник`, price: `32 000`, description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы...`},
      {id: 13, color: `13`, image: `/img/item13.jpg`, retina: `/img/item13@2x.jpg`, type: `sell`, categories: [{id: 2, title: `Электроника`}], title: `Штатив Sony`, price: `8 000`, description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними...`},
      {id: 14, color: `14`, image: `/img/item14.jpg`, retina: `/img/item14@2x.jpg`, type: `sell`, categories: [{id: 2, title: `Электроника`}], title: `Дрон с камерой`, price: `32 000`, description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы...`},
      {id: 10, color: `10`, image: `/img/item10.jpg`, retina: `/img/item10@2x.jpg`, type: `sell`, categories: [{id: 1, title: `Дом`}, {id: 2, title: `Электроника`}], title: `Мое старое кресло`, price: `4000`, description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними...`},
      {id: 6, color: `06`, image: `/img/item06.jpg`, retina: `/img/item06@2x.jpg`, type: `sell`, categories: [{id: 2, title: `Электроника`}], title: `Ableton`, price: `88 000`, description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними...`},
    ]
  },
  {id: 3, title: `Одежда`, count: `106`, image: `/img/cat03.jpg`, retina: `/img/cat03@2x.jpg`},
  {id: 4, title: `Спорт/отдых`, count: `86`, image: `/img/cat04.jpg`, retina: `/img/cat04@2x.jpg`},
  {id: 5, title: `Авто`, count: `34`, image: `/img/cat05.jpg`, retina: `/img/cat05@2x.jpg`},
  {id: 6, title: `Книги`, count: `92`, image: `/img/cat06.jpg`, retina: `/img/cat06@2x.jpg`},
];
