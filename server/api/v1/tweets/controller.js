exports.all = (req, res, next) => {
  const { query = {} } = req;
  res.json({
    data: [],
    included: {
      query,
    },
  });
};

exports.create = (req, res, next) => {
  const { body = {} } = req;

  res.json({
    data: body,
  });
};

exports.read = (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params;

  res.json({
    data: {
      id,
    },
  });
};

exports.update = (req, res, next) => {
  const { body = {}, params = {} } = req;
  res.json({
    data: body,
    included: {
      params,
    },
  });
};

exports.delete = (req, res, next) => {
  res.json({});
};
