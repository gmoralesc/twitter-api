const { Model, fields, references, virtuals } = require('./model');
const { paginationParseParams, sortParseParams } = require('./../../../utils');

exports.all = async (req, res, next) => {
  const { query = {} } = req;
  const { limit, skip } = paginationParseParams(query);
  const { sortBy, direction } = sortParseParams(query, fields);
  const populate = [
    ...Object.getOwnPropertyNames(references),
    ...Object.getOwnPropertyNames(virtuals),
  ].join(' ');

  try {
    const [data = [], total = 0] = await Promise.all([
      Model.find({})
        .limit(limit)
        .skip(skip)
        .sort({
          [sortBy]: direction,
        })
        .populate(populate)
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

exports.create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id } = decoded;

  // const safeFields = Object.getOwnPropertyNames(body).reduce((field, list) => {
  //   if (Object.getOwnPropertyNames(fields).includes(field)) {
  //     list[field] = body[field]
  //   }
  //   return list
  // }, {})

  const document = new Model({
    ...body,
    userId: id,
  });

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

  const populate = Object.getOwnPropertyNames(references).join(' ');

  try {
    const data = await Model.findById(id).populate(populate).exec();

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
