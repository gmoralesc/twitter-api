const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const controller = require('./controller');

/*
 * /api/v1/users/signup     POST   Create
 * /api/v1/users/signin     POST   Login
 * /api/v1/users/:id GET    Read
 * /api/v1/users/:id PUT    Update
 * /api/v1/users/:id DELETE Delete
 */

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .patch(controller.update)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
