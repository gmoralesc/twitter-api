const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const controller = require('./controller');
const { auth, owner } = require('../auth');
const { sanatizers } = require('./model');

/*
 * /api/v1/tweets     POST   Create
 * /api/v1/tweets     GET    Read all
 * /api/v1/tweets/:id GET    Read
 * /api/v1/tweets/:id PUT    Update
 * /api/v1/tweets/:id DELETE Delete
 */

router.route('/').get(controller.all).post(auth, sanatizers, controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .patch(auth, owner, sanatizers, controller.update)
  .put(auth, owner, sanatizers, controller.update)
  .delete(auth, owner, controller.delete);

module.exports = router;
