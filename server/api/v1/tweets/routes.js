const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const controller = require('./controller');

/*
 * /api/v1/tweets     POST   Create
 * /api/v1/tweets     GET    Read all
 * /api/v1/tweets/:id GET    Read
 * /api/v1/tweets/:id PUT    Update
 * /api/v1/tweets/:id DELETE Delete
 */

router.route('/').get(controller.all).post(controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .patch(controller.update)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
