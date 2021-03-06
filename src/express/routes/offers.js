'use strict';

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const {globalData} = require(`../templates/data/global`);

const router = Router;
const offersRouter = router();

const UPLOAD_DIR = `../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;

  const offerData = {
    picture: file.filename,
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    categories: body.category
  };

  try {
    await api.createOffer(offerData);
    res.redirect(`/my`);
  } catch (e) {
    const categories = await api.getCategories();
    res.render(`ticket-edit`, {
      ...globalData,
      offer: offerData,
      categories,
      editMode: true,
    });
  }
});

offersRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  res.render(`new-ticket`, {
    ...globalData,
    categories,
    editMode: false,
  });
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories()
  ]);

  res.render(`ticket-edit`, {
    ...globalData,
    offer,
    categories,
    editMode: true,
  });
});

offersRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const offer = await api.getOffer(id, true);

  res.render(`ticket`, {
    ...globalData,
    offer
  });
});

module.exports = offersRouter;
