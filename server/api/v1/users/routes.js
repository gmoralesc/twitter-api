const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const controller = require('./controller');
const { auth, me } = require('../auth');

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
  .patch(auth, me, controller.update)
  .put(auth, me, controller.update)
  .delete(auth, me, controller.delete);

module.exports = router;
