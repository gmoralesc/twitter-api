const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const controller = require('./controller');
const { auth, owner } = require('../auth');

/*
 * /api/v1/comments     POST   Create
 * /api/v1/comments     GET    Read all
 * /api/v1/comments/:id GET    Read
 * /api/v1/comments/:id PUT    Update
 * /api/v1/comments/:id DELETE Delete
 */

router.route('/').get(controller.all).post(auth, controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .patch(auth, owner, controller.update)
  .put(auth, owner, controller.update)
  .delete(auth, owner, controller.delete);

module.exports = router;
