const { Model, fields } = require('./model');
const { paginationParseParams, sortParseParams } = require('./../../../utils');
const { signToken } = require('../auth');

exports.all = async (req, res, next) => {
  const { query = {} } = req;
  const { limit, skip } = paginationParseParams(query);
  const { sortBy, direction } = sortParseParams(query, fields);

  try {
    const [data = [], total = 0] = await Promise.all([
      Model.find({})
        .limit(limit)
        .skip(skip)
        .sort({
          [sortBy]: direction,
        })
        .exec(),
      Model.countDocuments(),
    ]);

    // const data = await Model.find({}).limit(limit).skip(skip).exec();
    // const total = await Model.countDocuments();

    res.json({
      data,
      meta: {
        limit,
        skip,
        total,
        sortBy,
        direction,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { body = {} } = req;
  const { username = '', password = '' } = body;

  const document = await Model.findOne({ username });

  if (document) {
    const verified = await document.verifyPassword(password);
    if (verified) {
      const payload = {
        id: document._id,
      };
      const token = signToken(payload);

      res.json({
        data: document,
        meta: {
          token,
        },
      });
    } else {
      next({
        message: 'Username or password are incorrect',
      });
    }
  } else {
    next({
      message: 'Username or password are incorrect',
    });
  }
};

exports.signup = async (req, res, next) => {
  const { body = {} } = req;

  const document = new Model(body);

  try {
    const data = await document.save();

    res.status(201);
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params;

  try {
    const data = await Model.findById(id).exec();

    if (data) {
      req.doc = data;
      next();
    } else {
      next({
        statusCode: 404,
        message: 'Document not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json({
    data: doc,
  });
};

exports.update = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const data = await Model.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const data = await Model.findByIdAndDelete(id);
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
